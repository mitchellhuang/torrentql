import { Repository } from 'typeorm';
import { Resolver, Query, Arg, Mutation, Ctx, Int } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Context } from '../lib/context';
import { User } from '../entities/User';
import * as jwt from '../lib/jwt';

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query(returns => User)
  me(@Ctx() ctx: Context) {
    return this.userRepository.findOne(ctx.user.id);
  }

  @Mutation(returns => User)
  async createUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    await this.userRepository.save(user);
    return {
      ...user,
      token: jwt.encode(user.id, user.email),
    };
  }

  @Mutation(returns => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ email });
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
  }

  @Mutation(returns => Boolean)
  async deleteUser(@Ctx() ctx: Context) {
    const user = await this.userRepository.findOne(ctx.user.id);
    const result = await this.userRepository.remove(user);
    return true;
  }
}
