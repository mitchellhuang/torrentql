import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Torrent } from './Torrent';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

}
