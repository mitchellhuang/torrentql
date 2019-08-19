import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import crypto from 'crypto';
import { User } from './User';

@ObjectType()
@Entity('api_keys')
export class ApiKey {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Column()
  @Index()
  hash: string;

  @Field({ nullable: true })
  key: string;

  @ManyToOne(type => User, user => user.apiKeys)
  user: Promise<User>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hashKey() {
    if (this.key) {
      this.hash = ApiKey.hashKey(this.key);
    }
  }

  static hashKey(key: string) {
    return crypto.createHash('sha256').update(key).digest('hex');
  }

}
