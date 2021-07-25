import { Injectable } from '@nestjs/common';
import {
  BeforeUpdateOneHook,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';

export type GqlContext = { req: { headers: Record<string, string> } };

@Injectable()
export class UpdateHook<T> implements BeforeUpdateOneHook<T, GqlContext> {
  async run(
    instance: UpdateOneInputType<T>,
    context: GqlContext,
  ): Promise<UpdateOneInputType<T>> {
    console.log('UPDATE HOOK');
    return instance;
  }
}
