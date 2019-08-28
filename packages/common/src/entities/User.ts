import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { Torrent } from './Torrent';
import { ApiKey } from './ApiKey';
import { BitcoinTransaction } from './BitcoinTransaction';

@ObjectType()
@Entity('users')
export class User {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['enabled', 'disabled', 'banned'],
    default: 'enabled',
  })
  status: 'enabled' | 'disabled' | 'banned';

  @Field()
  @Column('decimal', { precision: 19, scale: 4, default: 0 })
  balance: number;

  @Field({ nullable: true })
  token: string;

  @Field(type => [Torrent])
  @OneToMany(type => Torrent, torrent => torrent.user)
  torrents: Promise<Torrent[]>;

  @Field(type => [ApiKey])
  @OneToMany(type => ApiKey, apiKey => apiKey.user)
  apiKeys: Promise<ApiKey[]>;

  @Field(type => [BitcoinTransaction])
  @OneToMany(type => BitcoinTransaction, bitcoinTransaction => bitcoinTransaction.user)
  bitcoinTransactions: Promise<BitcoinTransaction[]>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

}
