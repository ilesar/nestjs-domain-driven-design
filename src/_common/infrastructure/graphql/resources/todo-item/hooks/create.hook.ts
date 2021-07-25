import { Injectable } from '@nestjs/common';
import {
  BeforeCreateOneHook,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';

export type GqlContext = { req: { headers: Record<string, string> } };

@Injectable()
export class CreateHook<T> implements BeforeCreateOneHook<T, GqlContext> {
  async run(
    instance: CreateOneInputType<T>,
    context: GqlContext,
  ): Promise<CreateOneInputType<T>> {
    console.log('CREATE HOOK');
    return instance;
  }
}
