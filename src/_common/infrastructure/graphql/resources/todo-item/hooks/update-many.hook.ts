import { Injectable } from '@nestjs/common';
import {
  BeforeUpdateManyHook,
  UpdateManyInputType,
} from '@nestjs-query/query-graphql';

export type GqlContext = { req: { headers: Record<string, string> } };

@Injectable()
export class UpdateManyHook<T> implements BeforeUpdateManyHook<T, T> {
  async run(
    instance: UpdateManyInputType<T, T>,
    context: GqlContext,
  ): Promise<UpdateManyInputType<T, T>> {
    console.log('UPDATE MANY HOOK');
    return instance;
  }
}
