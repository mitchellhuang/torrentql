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
class UpdateForgottenPassword {
  @Field()
  @MinLength(8)
  newPassword: string;

  @Field()
  token: string;
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

  @Mutation(returns => Boolean)
  async sendPasswordResetEmail(
    @Args() { email }: SendPasswordResetEmail,
  ) {
    try {
      const id = nanoid();
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(id, salt);
      const url = `http://localhost:3000/reset_password/${hash}`;
      const msg = {
        to: email,
        from: 'i-love-torrents69@torrentql.com',
        templateId: 'd-0acf3aefc3dd46ee87a1afc3ad9956ef',
        dynamic_template_data: {
          link: `<a href="${url}">${url}</a>`,
        },
      };
      await sgMail.send(msg);
      const passwordReset = new PasswordReset();
      passwordReset.hash = hash;
      passwordReset.email = email;
      passwordReset.expiryDate = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
      await this.passwordResetRepository.save(passwordReset);
      return true;
    } catch (err) {
      throw new Error('Unable to generate email.');
    }
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

  @Mutation(returns => User)
  async updateForgottenPasswordMutation(
    @Args() { newPassword, token }: UpdateForgottenPassword,
  ) {

  }

  @Authorized()
  @Mutation(returns => Boolean)
  async deleteUser(@Ctx() ctx: Context) {
    await this.userRepository.remove(ctx.user);
    return true;
  }
}
