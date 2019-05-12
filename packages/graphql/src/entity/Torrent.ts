import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Server } from './Server';

@Entity('torrents')
export class Torrent {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string;

  @Column()
  type: 'file' | 'magnet';

  @Column()
  data: string;

  @Column()
  is_active: boolean;

  @ManyToOne(type => User, user => user.torrents)
  user: Promise<User>;

  @ManyToOne(type => Server, server => server.torrents)
  server: Promise<Server>;

}
