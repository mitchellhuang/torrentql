import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
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
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  token: string;

  @Field(type => [Torrent])
  @OneToMany(type => Torrent, torrent => torrent.user)
  torrents: Promise<Torrent[]>;

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
