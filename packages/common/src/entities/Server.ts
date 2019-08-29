import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Torrent } from './Torrent';

@ObjectType()
@Entity('servers')
export class Server {

  @Field(type => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  tag: string;

  @Field()
  @Index()
  @Column({
    type: 'enum',
    enum: ['eu-west-1'],
    default: 'eu-west-1',
  })
  region: 'eu-west-1';

  @Index()
  @Column({ default: true })
  enabled: boolean;

  @Column()
  delugeUrl: string;

  @Column()
  fileUrl: string;

  @OneToMany(type => Torrent, torrent => torrent.server)
  torrents: Promise<Torrent[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
