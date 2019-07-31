import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('billing_history')
export class BillingHistory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 19, scale: 4 })
  totalCost: number;

  @Column()
  beginAt: Date;

  @Column()
  endAt: Date;

  @ManyToOne(type => User)
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}