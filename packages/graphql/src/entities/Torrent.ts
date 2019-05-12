import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';
import { Server } from './Server';

@ObjectType()
export class TorrentStatus {
  @Field()
  name: string;
}

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
  is_active: boolean;

  @Field(type => TorrentStatus, { nullable: true })
  status: TorrentStatus;

  @Field(type => User)
  @ManyToOne(type => User, user => user.torrents)
  user: Promise<User>;

  @Field(type => Server)
  @ManyToOne(type => Server, server => server.torrents)
  server: Promise<Server>;

}
