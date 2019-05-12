import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Torrent } from './Torrent';

@ObjectType()
@Entity('users')
export class User {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field(type => [Torrent])
  @OneToMany(type => Torrent, torrent => torrent.user)
  torrents: Promise<Torrent[]>;

  @Field({ nullable: true })
  token: string;

}
