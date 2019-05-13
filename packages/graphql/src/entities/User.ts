import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import bcrypt from 'bcryptjs';
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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

}
