import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import BigInt from 'graphql-bigint';
import { User } from './User';
import { Torrent } from './Torrent';

@ObjectType()
@Entity('billing_usage')
export class BillingUsage {

  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => BigInt)
  @Column('bigint')
  diskUsage: number;

  @Field(type => BigInt)
  @Column('bigint')
  dataTransferIn: number;

  @Field(type => BigInt)
  @Column('bigint')
  dataTransferOut: number;

  @ManyToOne(type => Torrent)
  torrent: Promise<Torrent>;

  @ManyToOne(type => User)
  user: Promise<User>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
