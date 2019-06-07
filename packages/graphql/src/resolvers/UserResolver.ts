import { Repository } from 'typeorm';
import { Resolver, Query, Args, ArgsType, Field, Mutation, Ctx, Authorized } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IsEmail, MinLength } from 'class-validator';
import { Context } from '../lib/context';
import { User } from '../entities/User';
import * as jwt from '../lib/jwt';

@ArgsType()
class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

@ArgsType()
class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

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
    @Args() { email, password }: CreateUserInput,
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
    @Args() { email, password }: LoginInput,
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
