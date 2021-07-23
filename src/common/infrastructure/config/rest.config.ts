import { GqlModuleAsyncOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const restConfig: any = {
  entitiesForAutoCrud: [],
};
