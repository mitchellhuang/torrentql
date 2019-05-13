import {
  Entity,
  PrimaryColumn,
  Column,
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
  id: string;

  @Column()
  host: string;

  @Column()
  port: string;

  @Column()
  protocol: string;

  @Field()
  @Column()
  region: string;

  @Column({ nullable: true })
  cpuLoad: string;

  @Column({ nullable: true })
  activeTorrents: string;

  @Column({ nullable: true })
  totalTorrents: string;

  @Column({ nullable: true })
  usedSpace: string;

  @Column({ nullable: true })
  totalSpace: string;

  @Column({ nullable: true })
  downloadSpeed: string;

  @Column({ nullable: true })
  uploadSpeed: string;

  @Column({ nullable: true })
  portSpeed: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Torrent, torrent => torrent.server)
  torrents: Promise<Torrent[]>;

}
