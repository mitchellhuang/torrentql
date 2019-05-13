import { Repository } from 'typeorm';
import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Context } from '../lib/context';
import { User } from '../entities/User';
import * as jwt from '../lib/jwt';

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Authorized()
  @Query(returns => User)
  me(@Ctx() ctx: Context) {
    return ctx.user;
  }

  @Mutation(returns => User)
  async createUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const user = new User();
    user.email = email;
    user.password = password;
    await this.userRepository.save(user);
    user.token = jwt.encode(user.id, user.email);
    return user;
  }

  @Mutation(returns => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new Error('User not found.');
    }
    const valid = await user.verifyPassword(password);
    if (!valid) {
      throw new Error('Invalid password.');
    }
    user.token = jwt.encode(user.id, user.email);
    return user;
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async deleteUser(@Ctx() ctx: Context) {
    await this.userRepository.remove(ctx.user);
    return true;
  }
}
