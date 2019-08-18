import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('password_resets')
export class PasswordReset {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  hash: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  expiryDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
