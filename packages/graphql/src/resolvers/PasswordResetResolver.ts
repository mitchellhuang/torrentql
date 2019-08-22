import { Repository } from 'typeorm';
import {
  Resolver,
  Args,
  ArgsType,
  Field,
  Mutation,
} from 'type-graphql';
import nanoid from 'nanoid';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IsEmail, MinLength } from 'class-validator';
import { User } from '@torrentql/common/dist/entities/User';
import { PasswordReset } from '@torrentql/common/dist/entities/PasswordReset';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

@ArgsType()
class SendPasswordResetEmail {
  @Field()
  @IsEmail()
  email: string;
}

@ArgsType()
class ResetPassword {
  @Field()
  @MinLength(8)
  password: string;

  @Field()
  key: string;
}

@Resolver(of => PasswordReset)
export class PasswordResetResolver {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(PasswordReset)
  private passwordResetRepository: Repository<PasswordReset>;

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
    const url = `${process.env.ROOT_URL as string}/reset_password/${passwordReset.key}`;
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
    if (new Date(passwordReset.expiredAt) < new Date() || passwordReset.used === true) {
      throw new Error('Password reset link expired.');
    }
    const user = await passwordReset.user;
    user.password = password;
    await this.userRepository.save(user);
    passwordReset.used = true;
    await this.passwordResetRepository.save(passwordReset);
    return true;
  }
}
