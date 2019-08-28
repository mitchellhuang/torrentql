import { Repository, getConnection } from 'typeorm';
import {
  Args,
  ArgsType,
  Field,
  Mutation,
  Query,
  Ctx,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IsEnum } from 'class-validator';
import opennode from 'opennode';
import { Request, Response } from 'express';
import { User } from '@torrentql/common/dist/entities/User';
import { BitcoinTransaction } from '@torrentql/common/dist/entities/BitcoinTransaction';
import { BillingUsage } from '@torrentql/common/dist/entities/BillingUsage';
import { Context } from '../lib/context';
import { Authorized } from '../lib/decorators';

const dev = process.env.FRONTEND_HOST !== 'https://torrentql.com';

opennode.setCredentials(process.env.OPENNODE_API_KEY, dev ? 'dev' : 'live');

enum BitcoinTransactionAmount {
  Twenty = 20,
  Forty = 40,
  Sixty = 60,
  Eighty = 80,
  Hundred = 100,
}

@ArgsType()
class CreateBitcoinTransactionInput {
  @Field()
  @IsEnum(BitcoinTransactionAmount)
  amount: number;
}

export class BillingResolver {
  @InjectRepository(BitcoinTransaction)
  @InjectRepository(BillingUsage)
  private bitcoinTransactionRepository: Repository<BitcoinTransaction>;
  private billingUsageRepository: Repository<BillingUsage>;
  @Authorized()
  @Mutation(returns => BitcoinTransaction)
  async createBitcoinTransaction(
    @Args() { amount }: CreateBitcoinTransactionInput,
    @Ctx() ctx: Context,
  ) {
    const user = ctx.user;
    const charge = await opennode.createCharge({
      amount,
      currency: 'USD',
      description: `$${amount} Account Recharge`,
      customer_email: user.email,
      callback_url: `${process.env.FRONTEND_HOST}/webhook/opennode`,
      success_url: `${process.env.FRONTEND_HOST}/account/billing`,
      auto_settle: false,
    });
    const bitcoinTransaction = new BitcoinTransaction();
    const urlPrefix = dev ? 'https://dev-checkout.opennode.co/' : 'https://checkout.opennode.co/';
    bitcoinTransaction.id = charge.id;
    bitcoinTransaction.status = charge.status;
    bitcoinTransaction.amount = amount;
    bitcoinTransaction.amountSatoshi = charge.amount;
    bitcoinTransaction.invoiceUrl = urlPrefix + charge.id;
    bitcoinTransaction.user = Promise.resolve(ctx.user);
    return this.bitcoinTransactionRepository.save(bitcoinTransaction);
  }

  @Authorized()
  @Query(returns => String)
  async billingUsage(@Ctx() ctx: Context) {
    // this.billingUsageRepository
    // .find({})
    // console.log(JSON.stringify(this.billingUsageRepository));
    const result = this.billingUsageRepository;
    // console.log(result);
    return 'asdf';
  }

  static async webhook(req: Request, res: Response) {
    const connection = getConnection();
    const charge = req.body;
    const isValid = await opennode.signatureIsValid(charge);
    if (isValid) {
      await connection.transaction(async (transaction) => {
        const bitcoinTransaction = await transaction
          .getRepository(BitcoinTransaction)
          .findOne(charge.id);
        if (bitcoinTransaction) {
          if (bitcoinTransaction.status === 'paid') {
            return;
          }
          bitcoinTransaction.status = charge.status;
          await transaction
            .getRepository(BitcoinTransaction)
            .save(bitcoinTransaction);
          if (bitcoinTransaction.status === 'paid') {
            const user = await bitcoinTransaction.user;
            await transaction
              .getRepository(User)
              .createQueryBuilder('user')
              .update({
                balance: () => 'balance + :amount',
              })
              .where({
                id: user.id,
              })
              .setParameter('amount', bitcoinTransaction.amount)
              .execute();
          }
        }
      });
    }
    res.sendStatus(200);
  }
}
