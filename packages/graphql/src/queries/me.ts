import { GraphQLFieldResolver } from 'graphql';
import { Context } from '../lib/context';
import { User } from '../entity/User';

export const me: GraphQLFieldResolver<void, Context> = async (parent, args, context) => {
  if (!context.user) {
    throw new Error('You are not authenticated.');
  }
  const userRepository = context.connection.getRepository(User);
  return userRepository.findOne(context.user.id);
};
