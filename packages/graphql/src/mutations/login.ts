import { GraphQLFieldResolver } from 'graphql';
import { Context } from '../lib/context';
import { User } from '../entity/User';
import * as jwt from '../lib/jwt';

interface LoginArgs {
  email: string;
  password: string;
}

export const login: GraphQLFieldResolver<void, Context, LoginArgs> =
  async (parent, args, context) => {
    const { email, password } = args;
    const userRepository = context.connection.getRepository(User);
    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new Error('User not found.');
    }
    const valid = user.password === password;
    if (!valid) {
      throw new Error('Invalid password.');
    }
    return {
      ...user,
      token: jwt.encode(user.id, user.email),
    };
  };
