import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('torrents')
export class Torrent {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hash: string;

  @Column()
  type: 'file' | 'magnet';

  @Column()
  data: string;

  @Column()
  is_active: boolean;

}
