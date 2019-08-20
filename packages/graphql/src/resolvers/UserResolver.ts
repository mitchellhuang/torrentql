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
import { PasswordReset } from '@torrentql/common/dist/entities/PasswordReset';
import * as jwt from '../lib/jwt';
import { Context } from '../lib/context';
import sgMail from '@sendgrid/mail';
import nanoid from 'nanoid';
import bcrypt from 'bcryptjs';

sgMail.setApiKey('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');

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
class SendPasswordResetEmail {
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


@ArgsType()
class ResetPassword {
  @Field()
  @MinLength(8)
  password: string;

  @Field()
  key: string;
}

@Resolver(of => User)
export class UserResolver {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Torrent)
  private torrentRepository: Repository<Torrent>;

  @InjectRepository(PasswordReset)
  private passwordResetRepository: Repository<PasswordReset>;

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
    const torrentsWithDelugeNotNull = torrentsWithDeluge.filter(torrent => torrent !== null);
    return torrentsWithDelugeNotNull;
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

  @Mutation(returns => Boolean)
  async sendPasswordResetEmail(
    @Args() { email }: SendPasswordResetEmail,
  ) {
    const user = await this.userRepository.findOne({
      email,
    });
    if (!user) {
      return true;
    }
    const passwordReset = new PasswordReset();
    passwordReset.key = nanoid();
    passwordReset.user = Promise.resolve(user);
    const url = `http://localhost:3000/reset_password/${passwordReset.key}`;
    const msg = {
      to: email,
      from: 'support@torrentql.com',
      templateId: 'd-0acf3aefc3dd46ee87a1afc3ad9956ef',
      dynamic_template_data: {
        link: `<a href="${url}">${url}</a>`,
      },
    };
    try {
      await sgMail.send(msg);
    } catch (err) {
      throw new Error('Unable to send password reset email.');
    }
    await this.passwordResetRepository.save(passwordReset);
    return true;
  }

  @Mutation(returns => Boolean)
  async resetPassword(
    @Args() { password, key }: ResetPassword,
  ) {
    const hash = PasswordReset.hashKey(key);
    const passwordReset = await this.passwordResetRepository.findOne({
      hash,
    });
    if (!passwordReset) {
      throw new Error('Invalid password reset link.');
    }
    if (new Date(passwordReset.expiredAt) < new Date()) {
      throw new Error('Password reset link expired.');
    }
    const user = await passwordReset.user;
    user.password = password;
    await this.userRepository.save(user);
    return true;
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async deleteUser(@Ctx() ctx: Context) {
    await this.userRepository.remove(ctx.user);
    return true;
  }
}
