import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Torrent } from './Torrent';

@Entity('billing_period')
export class BillingPeriod {

  @PrimaryGeneratedColumn()
  id: string;

  @Column('bigint')
  diskUsageByteSeconds: number;

  @Column('bigint')
  diskUsageByteSecondsBilled: number;

  @Column('bigint')
  dataTransferIn: number;

  @Column('bigint')
  dataTransferInBilled: number;

  @Column('bigint')
  dataTransferOut: number;

  @Column('bigint')
  dataTransferOutBilled: number;

  @OneToOne(type => Torrent)
  @JoinColumn()
  torrent: Promise<Torrent>;

  @ManyToOne(type => User)
  user: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
