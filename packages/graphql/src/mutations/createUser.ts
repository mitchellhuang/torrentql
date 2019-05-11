import { GraphQLFieldResolver } from 'graphql';
import { Context } from '../lib/context';
import { User } from '../entity/User';
import * as jwt from '../lib/jwt';

interface CreateUserArgs {
  email: string;
  password: string;
}

export const createUser: GraphQLFieldResolver<void, Context, CreateUserArgs> =
  async (parent, { email, password }, context) => {
    const user = new User();
    user.email = email;
    user.password = password;
    const userRepository = context.connection.getRepository(User);
    await userRepository.save(user);
    return {
      ...user,
      token: jwt.encode(user.id, user.email),
    };
  };
