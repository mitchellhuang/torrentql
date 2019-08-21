import { Repository } from 'typeorm';
import {
  Resolver,
  Query,
  Args,
  ArgsType,
  Field,
  FieldResolver,
  Root,
  Mutation,
  Ctx,
  Authorized,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IsEmail, MinLength } from 'class-validator';
import { mapDelugeToTorrent } from '@torrentql/common/dist/lib/deluge';
import { User } from '@torrentql/common/dist/entities/User';
import { Torrent } from '@torrentql/common/dist/entities/Torrent';
import * as jwt from '../lib/jwt';
import { Context } from '../lib/context';

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

@ArgsType()
class UpdateUserEmailInput {
  @Field()
  @IsEmail()
  email: string;
}

@ArgsType()
class UpdateUserPasswordInput {
  @Field()
  oldPassword: string;

  @Field()
  @MinLength(8)
  password: string;
}


@Resolver(of => User)
export class UserResolver {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Torrent)
  private torrentRepository: Repository<Torrent>;

  @Authorized()
  @Query(returns => User)
  me(@Ctx() ctx: Context) {
    return ctx.user;
  }

  @FieldResolver()
  async torrents(@Root() user: User) {
    const torrents = await this.torrentRepository.find({
      where: {
        user: { id: user.id },
        isActive: true,
      },
    });
    const torrentsWithDeluge = await Promise.all(torrents.map(mapDelugeToTorrent));
    return torrentsWithDeluge.filter(torrent => torrent !== null);
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
  async updateUserEmail(
    @Args() { email }: UpdateUserEmailInput,
    @Ctx() ctx: Context,
  ) {
    const user = ctx.user;
    user.email = email;
    try {
      await this.userRepository.save(user);
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        throw new Error('Email already exists.');
      }
      throw new Error('An unknown error occured.');
    }
    return user;
  }

  @Authorized()
  @Mutation(returns => User)
  async updateUserPassword(
    @Args() { oldPassword, password }: UpdateUserPasswordInput,
    @Ctx() ctx: Context,
  ) {
    const user = ctx.user;
    const valid = await user.verifyPassword(oldPassword);
    if (!valid) {
      throw new Error('Invalid old password.');
    }
    user.password = password;
    return this.userRepository.save(user);
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async deleteUser(@Ctx() ctx: Context) {
    await this.userRepository.remove(ctx.user);
    return true;
  }
}
