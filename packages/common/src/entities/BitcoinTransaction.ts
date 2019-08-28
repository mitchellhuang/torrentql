import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ObjectType,
  ID,
  Field,
  Float,
} from 'type-graphql';
import BigInt from 'graphql-bigint';
import { User } from './User';

@ObjectType()
@Entity('bitcoin_transactions')
export class BitcoinTransaction {

  @Field(type => ID)
  @PrimaryColumn('uuid')
  id: string;

  @Field()
  @Column()
  @Index()
  status: string;

  @Field(type => Float)
  @Column('decimal', { precision: 19, scale: 4 })
  amount: number;

  @Field(type => BigInt)
  @Column('bigint')
  amountSatoshi: number;

  @Field()
  @Column()
  invoiceUrl: string;

  @ManyToOne(type => User, user => user.bitcoinTransactions)
  user: Promise<User>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

}
