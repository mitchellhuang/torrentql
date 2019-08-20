import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import crypto from 'crypto';
import { User } from './User';

@Entity('password_resets')
export class PasswordReset {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Index()
  hash: string;

  key: string;

  @ManyToOne(type => User)
  user: Promise<User>;

  @Column({ default: () => 'NOW() + INTERVAL \'1 DAY\'' })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hashKey() {
    if (this.key) {
      this.hash = PasswordReset.hashKey(this.key);
    }
  }

  static hashKey(key: string) {
    return crypto.createHash('sha256').update(key).digest('hex');
  }

}
