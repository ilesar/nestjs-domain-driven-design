import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TodoItemEntity } from '../../database/entities/todo-item/todo-item.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { graphQLConfig, graphqlCrudMap } from '../../config/graphQL.config';

@Module({
  imports: [
    GraphQLModule.forRootAsync(graphQLConfig),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TodoItemEntity])],
      resolvers: [
        ...graphqlCrudMap.map((entityItem) => {
          return {
            DTOClass: entityItem.dto,
            EntityClass: entityItem.entity,
            guards: [],
            ...entityItem.operations,
          };
        }),
      ],
    }),
  ],
  providers: [],
  exports: [],
})
export class GraphqlModule {}
