import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { graphqlCrudConfig } from '@application/config/graphql-crud.config';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TodoItemEntity])],
      resolvers: [
        ...graphqlCrudConfig.map((entityItem) => {
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
