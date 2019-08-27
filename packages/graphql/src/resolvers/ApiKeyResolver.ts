import { Repository } from 'typeorm';
import {
  Args,
  ArgsType,
  Field,
  Mutation,
  Ctx,
  Authorized,
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IsUUID, IsNotEmpty } from 'class-validator';
import nanoid from 'nanoid';
import { ApiKey } from '@torrentql/common/dist/entities/ApiKey';
import { Context } from '../lib/context';

@ArgsType()
class CreateApiKeyInput {
  @Field()
  @IsNotEmpty()
  name: string;
}

@ArgsType()
class DeleteApiKeyInput {
  @Field()
  @IsUUID()
  id: string;
}

export class ApiKeyResolver {
  @InjectRepository(ApiKey)
  private apiKeyRepository: Repository<ApiKey>;

  @Authorized()
  @Mutation(returns => ApiKey)
  async createApiKey(
    @Args() { name }: CreateApiKeyInput,
    @Ctx() ctx: Context,
  ) {
    const apiKey = new ApiKey();
    apiKey.key = nanoid();
    apiKey.name = name;
    apiKey.user = Promise.resolve(ctx.user);
    await this.apiKeyRepository.save(apiKey);
    return apiKey;
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async deleteApiKey(
    @Args() { id }: DeleteApiKeyInput,
    @Ctx() ctx: Context,
  ) {
    const apiKey = await this.apiKeyRepository.findOne(id);
    if (apiKey) {
      await this.apiKeyRepository.remove(apiKey);
      return true;
    }
    return false;
  }
}
