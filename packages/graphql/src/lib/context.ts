import { Request } from 'express';
import { Connection } from 'typeorm';
import { AuthChecker } from 'type-graphql';
import { User } from '../entities/User';

export interface Context {
  user: User;
}

export interface Context2 {
  user?: User;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const createContext = (connection: Connection) => {
  return async ({ req }: {req: AuthRequest}): Promise<Context2> => {
    if (req.user && req.user.id) {
      const userRepository = connection.getRepository(User);
      const user = await userRepository.findOne(req.user.id);
      return {
        user,
      };
    }
    return {
      user: undefined,
    };
  };
};

export const authChecker: AuthChecker<Context2> = (
  { root, args, context, info },
  roles,
) => {
  return !!context.user;
};
