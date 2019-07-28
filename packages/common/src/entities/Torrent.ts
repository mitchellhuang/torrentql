import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType, Int, Float } from 'type-graphql';
import BigInt from 'graphql-bigint';
import { GraphQLJSON } from 'graphql-type-json';
import { User } from './User';
import { Server } from './Server';

@ObjectType()
@Entity('torrents')
export class Torrent {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Index()
  @Column()
  hash: string;

  @Column({
    type: 'enum',
    enum: ['magnet', 'url', 'file'],
    default: 'file',
  })
  type: 'magnet' | 'url' | 'file';

  @Column('text')
  data: string;

  @Index()
  @Column()
  isActive: boolean;

  @Field()
  name: string;

  @Field()
  state: string;

  @Field(type => Float)
  progress: number;

  @Field(type => Float)
  ratio: number;

  @Field(type => BigInt)
  totalSize: number;

  @Field(type => Int)
  uploadSpeed: number;

  @Field(type => Int)
  downloadSpeed: number;

  @Field(type => Int)
  eta: number;

  @Field(type => Int)
  numPeers: number;

  @Field(type => Int)
  numSeeds: number;

  @Field(type => Int)
  totalPeers: number;

  @Field(type => Int)
  totalSeeds: number;

  @Field(type => BigInt)
  totalWanted: number;

  @Field(type => BigInt)
  totalUploaded: number;

  @Field(type => BigInt)
  totalDownloaded: number;

  @Field()
  tracker: string;

  @Field()
  trackerHost: string;

  @Field()
  trackerStatus: string;

  @Field(type => GraphQLJSON)
  files: Object;

  @Field(type => User)
  @ManyToOne(type => User, user => user.torrents)
  user: Promise<User> | User;

  @Field(type => Server)
  @ManyToOne(type => Server, server => server.torrents)
  server: Promise<Server> | Server;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
