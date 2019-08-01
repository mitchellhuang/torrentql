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

@Entity('billing_usage')
export class BillingUsage {

  @PrimaryGeneratedColumn()
  id: string;

  @Column('bigint')
  diskUsage: number;

  @Column('bigint')
  dataTransferIn: number;

  @Column('bigint')
  dataTransferOut: number;

  @ManyToOne(type => Torrent)
  torrent: Promise<Torrent>;

  @ManyToOne(type => User)
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
