import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Torrent } from './Torrent';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Torrent, torrent => torrent.user)
  torrents: Promise<Torrent[]>;

}
