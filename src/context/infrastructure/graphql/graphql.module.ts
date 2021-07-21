import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TodoItemEntity } from '../database/entities/todo-item/todo-item.entity';
import { graphqlCrudMap } from './graphql-crud.map';
import { GraphQLModule } from '@nestjs/graphql';
import { graphQLConfig } from '../../application/config/graphQL.config';

@Module({
  imports: [
    // GOAL -> BornfightAPIModule.register(config),
    GraphQLModule.forRootAsync(graphQLConfig),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TodoItemEntity])],
      resolvers: [
        ...graphqlCrudMap.map((entityItem) => {
          return {
            DTOClass: entityItem.dto,
            EntityClass: entityItem.entity,
            guards: [],
          };
        }),
      ],
    }),
  ],
  providers: [],
  exports: [],
})
export class GraphqlModule {}
