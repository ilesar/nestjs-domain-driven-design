import { GqlModuleAsyncOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoItemDto } from '../api/graphql/resources/todo-item/todo-item.dto';
import { TodoItemEntity } from '../database/entities/todo-item/todo-item.entity';

export const graphqlCrudMap = [
  {
    dto: TodoItemDto,
    entity: TodoItemEntity,
  },
];

export const graphQLConfig: GqlModuleAsyncOptions = {
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
