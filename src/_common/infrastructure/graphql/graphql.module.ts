import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { graphQLConfig, graphqlCrudMap } from '../config/graphQL.config';

@Module({
  imports: [
    GraphQLModule.forRootAsync(graphQLConfig),
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature(
          graphqlCrudMap.map((entityItem) => entityItem.entity),
        ),
      ],
      dtos: graphqlCrudMap.map((entityItem) => {
        return { DTOClass: entityItem.dto };
      }),
    }),
  ],
  providers: graphqlCrudMap.map((entityItem) => entityItem.resolver),
  exports: [],
})
export class GraphqlModule {}
