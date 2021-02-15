import { GqlModuleAsyncOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

const graphQLConfig: GqlModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req, connection }) =>
        connection
          ? {
              req: {
                headers: {
                  authorization: connection.context['Authorization']
                    ? connection.context['Authorization']
                    : connection.context['authorization'],
                },
              },
            }
          : { req },
      playground: configService.get<string>('APP_ENV') === 'dev',
      introspection: configService.get<string>('APP_ENV') === 'dev',
      installSubscriptionHandlers: true,
    };
  },
  inject: [ConfigService],
};

export = graphQLConfig;
