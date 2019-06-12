import { Repository } from 'typeorm';
import {
  Resolver,
  Query,
  Arg,
  Args,
  ArgsType,
  InputType,
  Field,
  Mutation,
  Ctx,
  Authorized,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IsEmail, MinLength } from 'class-validator';
import { Context } from '../lib/context';
import { User } from '../entities/User';
import * as jwt from '../lib/jwt';

@ArgsType()
class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

@ArgsType()
class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

@InputType()
class UpdatePasswordInput {
  @Field()
  oldPassword: string;

  @Field()
  @MinLength(8)
  password: string;
}

@InputType()
class UpdateEmailInput {
  @Field()
  @IsEmail()
  email: string;
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

  @Mutation(returns => User)
  async createUser(
    @Args() { email, password }: CreateUserInput,
  ) {
    const user = new User();
    user.email = email;
    user.password = password;
    try {
      await this.userRepository.save(user);
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        throw new Error('Email already exists.');
      }
      throw new Error('An unknown error occured.');
    }
    user.token = jwt.encode(user.id, user.email);
    return user;
  }

  @Authorized()
  @Mutation(returns => User)
  async updateUser(
    @Arg('updateEmailInput', { nullable: true }) updateEmailInput: UpdateEmailInput,
    @Arg('updatePasswordInput', { nullable: true }) updatePasswordInput: UpdatePasswordInput,
    @Ctx() ctx: Context,
  ) {
    const input = updateEmailInput || updatePasswordInput;
    if (!input) {
      throw new Error('Invalid input.');
    }
    if ((input as any).email) {
      const user = ctx.user;
      user.email = input.email;
      return this.userRepository.save(user);
    } else if ((input as any).password) { // tslint:disable-line
      const user = ctx.user;
      const valid = await user.verifyPassword((input as any).oldPassword);
      if (!valid) {
        throw new Error('Invalid old password.');
      }
      user.password = (input as any).password;
      return this.userRepository.save(user);
    }
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async deleteUser(@Ctx() ctx: Context) {
    await this.userRepository.remove(ctx.user);
    return true;
  }
}
