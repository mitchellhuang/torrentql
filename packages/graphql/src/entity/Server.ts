import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Torrent } from './Torrent';

@Entity('servers')
export class Server {

  @PrimaryColumn()
  id: string;

  @Column()
  host: string;

  @Column()
  port: string;

  @Column()
  protocol: string;

  @Column()
  region: string;

  @Column({ nullable: true })
  cpu_load: string;

  @Column({ nullable: true })
  active_torrents: string;

  @Column({ nullable: true })
  total_torrents: string;

  @Column({ nullable: true })
  used_space: string;

  @Column({ nullable: true })
  total_space: string;

  @Column({ nullable: true })
  download_speed: string;

  @Column({ nullable: true })
  upload_speed: string;

  @Column({ nullable: true })
  port_speed: string;

  @OneToMany(type => Torrent, torrent => torrent.server)
  torrents: Promise<Torrent[]>;

}
