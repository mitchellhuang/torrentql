import {
  Args,
  ArgsType,
  Field,
  Mutation,
  Ctx,
  Authorized,
} from 'type-graphql';
import opennode from 'opennode';
import { Context } from '../lib/context';

const dev = process.env.NODE_ENV !== 'production';

opennode.setCredentials(process.env.OPENNODE_API_KEY, dev ? 'dev' : 'live');

@ArgsType()
class CreateBitcoinTransactionInput {
  @Field()
  amount: number;
}

export class BillingResolver {
  @Authorized()
  @Mutation(returns => Boolean)
  async createBitcoinTransaction(
    @Args() { amount }: CreateBitcoinTransactionInput,
    @Ctx() ctx: Context,
  ) {
    const charge = await opennode.createCharge({
      amount,
      currency: 'USD',
      callback_url: 'https://torrentql.com/webhook/opennode',
      auto_settle: false,
    });
    console.log(charge);
    return true;
  }
}
