import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Torrent } from './Torrent';

@Entity('billing_activity')
export class BillingActivity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column('bigint')
  diskUsageBytes: number;

  @Column()
  diskUsageSeconds: number;

  @Column('decimal', { precision: 4, scale: 2 })
  diskUsageCost: number;

  @Column()
  dataTransferOut: number;

  @Column('decimal', { precision: 4, scale: 2 })
  dataTransferCost: number;

  @ManyToOne(type => Torrent)
  torrent: Promise<Torrent>;

  @ManyToOne(type => User)
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
