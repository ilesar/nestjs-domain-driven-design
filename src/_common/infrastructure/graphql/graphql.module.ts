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
        NestjsQueryTypeOrmModule.forFeature([
          ...graphqlCrudMap.map((entityItem) => entityItem.entity),
        ]),
      ],
      resolvers: [
        ...graphqlCrudMap.map((entityItem: any) => {
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
