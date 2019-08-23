import { Field, ObjectType, Float } from 'type-graphql';

@ObjectType()
export class File {

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  url: string;

  @Field(type => Float)
  progress: number;

  @Field(type => [File], { nullable: true })
  children?: File[];

}
