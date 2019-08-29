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

  @Column('decimal', { precision: 19, scale: 9 })
  cost: number;

  @Column('bigint')
  diskUsageByteSeconds: number;

  @Column('decimal', { precision: 19, scale: 9 })
  diskUsagePrice: number;

  @Column('decimal', { precision: 19, scale: 9 })
  diskUsageCost: number;

  @Column('bigint')
  dataTransferIn: number;

  @Column('decimal', { precision: 19, scale: 9 })
  dataTransferInPrice: number;

  @Column('decimal', { precision: 19, scale: 9 })
  dataTransferInCost: number;

  @Column('bigint')
  dataTransferOut: number;

  @Column('decimal', { precision: 19, scale: 9 })
  dataTransferOutPrice: number;

  @Column('decimal', { precision: 19, scale: 9 })
  dataTransferOutCost: number;

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
