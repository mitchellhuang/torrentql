import { createMethodDecorator } from 'type-graphql';
import { Context2 } from '../lib/context';

export const Authorized = () => { // tslint:disable-line
  return createMethodDecorator(async ({ context }: { context: Context2 }, next) => {
    if (context.user) {
      return next();
    }
    throw new Error('You must be authorized to perform this action.');
  });
};

export const Enabled = () => { // tslint:disable-line
  return createMethodDecorator(async ({ context }: { context: Context2 }, next) => {
    if (context.user && context.user.status === 'enabled') {
      return next();
    }
    throw new Error('Insufficient account balance.');
  });
};
