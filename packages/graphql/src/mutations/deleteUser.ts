import { GraphQLFieldResolver } from 'graphql';
import { Context } from '../lib/context';
import { User } from '../entity/User';

export const deleteUser: GraphQLFieldResolver<void, Context> =
  async (parent, args, context) => {
    if (!context.user) {
      throw new Error('You are not authenticated.');
    }
    const userRepository = context.connection.getRepository(User);
    const user = await userRepository.findOne(context.user.id);
    const result = await userRepository.remove(user);
    return true;
  };
