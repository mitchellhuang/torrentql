import { Repository } from 'typeorm';
import {
  Args,
  ArgsType,
  Field,
  Mutation,
  Ctx,
  Authorized,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import opennode from 'opennode';
import { BitcoinTransaction } from '@torrentql/common/dist/entities/BitcoinTransaction';
import { Context } from '../lib/context';

const dev = process.env.NODE_ENV !== 'production';

opennode.setCredentials(process.env.OPENNODE_API_KEY, dev ? 'dev' : 'live');

@ArgsType()
class CreateBitcoinTransactionInput {
  @Field()
  amount: number;
}

export class BillingResolver {
  @InjectRepository(BitcoinTransaction)
  private bitcoinTransactionRepository: Repository<BitcoinTransaction>;

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
      description: `Recharge Account $${amount}`,
      customer_email: user.email,
      callback_url: 'https://torrentql.com/webhook/opennode',
      success_url: 'https://torrentql.com/account/billing',
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
}
