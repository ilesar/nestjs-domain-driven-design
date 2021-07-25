import { Injectable } from '@nestjs/common';
import {
  BeforeCreateManyHook,
  CreateManyInputType,
} from '@nestjs-query/query-graphql';

export type GqlContext = { req: { headers: Record<string, string> } };

@Injectable()
export class CreateManyHook<T> implements BeforeCreateManyHook<T, GqlContext> {
  async run(
    instance: CreateManyInputType<T>,
    context: GqlContext,
  ): Promise<CreateManyInputType<T>> {
    console.log('CREATE MANY HOOK');
    return instance;
  }
}
