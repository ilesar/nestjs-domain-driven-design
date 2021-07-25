import { GqlModuleAsyncOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoItemEntity } from '../database/entities/todo-item/todo-item.entity';
import { TodoItemDto } from '../graphql/resources/todo-item/dtos/todo-item.dto';
import { TodoItemResolver } from '../graphql/resources/todo-item/todo-item.resolver';

export const graphqlCrudMap = [
  {
    dto: TodoItemDto,
    entity: TodoItemEntity,
    resolver: TodoItemResolver,
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
