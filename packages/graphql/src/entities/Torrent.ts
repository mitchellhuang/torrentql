import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';
import { Server } from './Server';
import { TorrentStatus } from './TorrentStatus';

@ObjectType()
@Entity('torrents')
export class Torrent {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  hash: string;

  @Column()
  type: 'file' | 'magnet';

  @Column()
  data: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(type => TorrentStatus, { nullable: true })
  status: TorrentStatus | null;

  @Field(type => User)
  @ManyToOne(type => User, user => user.torrents)
  user: Promise<User>;

  @Field(type => Server)
  @ManyToOne(type => Server, server => server.torrents)
  server: Promise<Server>;

}
