import { Field, ObjectType, Int, Float } from 'type-graphql';
import BigInt from 'graphql-bigint';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class TorrentStatus {
  @Field()
  name: string;

  @Field()
  state: string;

  @Field(type => Float)
  progress: number;

  @Field(type => Float)
  ratio: number;

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

  @Field(type => GraphQLJSON)
  files: Object;

}
