import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType, Int, Float } from 'type-graphql';
import BigInt from 'graphql-bigint';
import { Deluge } from '@ctrl/deluge';
import { User } from './User';
import { Server } from './Server';
import { File } from './File';

@ObjectType()
@Entity('torrents')
export class Torrent {

  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Index()
  @Column()
  hash: string;

  @Column({
    type: 'enum',
    enum: ['magnet', 'url', 'file'],
    default: 'file',
  })
  type: 'magnet' | 'url' | 'file';

  @Column('text')
  data: string;

  @Index()
  @Column()
  active: boolean;

  @Field()
  name: string;

  @Field()
  state: string;

  @Field(type => Float)
  progress: number;

  @Field(type => Float)
  ratio: number;

  @Field(type => BigInt)
  totalSize: number;

  @Field(type => Int)
  uploadSpeed: number;

  @Field(type => Int)
  downloadSpeed: number;

  @Field(type => Int)
  eta: number;

  @Field(type => Int)
  numPeers: number;

  @Field(type => Int)
  numSeeds: number;

  @Field(type => Int)
  totalPeers: number;

  @Field(type => Int)
  totalSeeds: number;

  @Field(type => BigInt)
  totalWanted: number;

  @Field(type => BigInt)
  totalUploaded: number;

  @Field(type => BigInt)
  totalDownloaded: number;

  @Field()
  tracker: string;

  @Field()
  trackerHost: string;

  @Field()
  trackerStatus: string;

  @Field({ nullable: true })
  files?: File;

  @Field(type => User)
  @ManyToOne(type => User, user => user.torrents)
  user: Promise<User>;

  @Field(type => Server)
  @ManyToOne(type => Server, server => server.torrents, { eager: true })
  server: Server;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async deluge() {
    return new Deluge({
      baseUrl: this.server.delugeUrl,
      password: 'deluge',
      timeout: 1000,
    });
  }

  async injectDeluge() {
    const deluge = await this.deluge();
    const prefix = this.server.fileUrl;
    let status;
    let files;
    try {
      status = await deluge.getTorrentStatus(this.hash);
      files = await deluge.getTorrentFiles(this.hash);
    } catch (err) {
      return;
    }
    this.name = status.result.name;
    this.state = status.result.state.toLowerCase();
    this.progress = status.result.progress;
    this.ratio = status.result.ratio;
    this.totalSize = status.result.total_size;
    this.uploadSpeed = status.result.upload_payload_rate;
    this.downloadSpeed = status.result.download_payload_rate;
    this.eta = status.result.eta;
    this.numPeers = status.result.num_peers;
    this.numSeeds = status.result.num_seeds;
    this.totalPeers = status.result.total_peers;
    this.totalSeeds = status.result.total_seeds;
    this.totalWanted = status.result.total_wanted;
    this.totalUploaded = status.result.total_uploaded;
    this.totalDownloaded = status.result.total_done;
    this.tracker = status.result.tracker;
    this.trackerHost = status.result.tracker_host;
    this.trackerStatus = status.result.tracker_status;
    const filesExist = Object.keys(files.result.contents).length > 0;
    this.files = filesExist ? transformFiles(files.result, prefix) : undefined;
    return this;
  }

}

const transformFiles = (files: any, prefix: string, name?: string): File => {
  if (files.type === 'file') {
    return {
      name: name || 'Unknown',
      type: files.type,
      url: prefix + encodeURI(files.path),
      progress: files.progress,
    };
  }
  const nameOrFirstKey = name || Object.keys(files.contents)[0];
  if (!name) {
    // tslint:disable-next-line
    files = files.contents[nameOrFirstKey];
  }
  const contents = files.contents;
  return {
    name: nameOrFirstKey,
    type: files.type,
    url: prefix + encodeURI(files.path || nameOrFirstKey),
    progress: files.progress,
    children: contents && Object.keys(contents).map(key => transformFiles(contents[key], prefix, key)),
  };
};
