import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TodoItemEntity } from '../database/entities/todo-item/todo-item.entity';
import { graphqlCrudMap } from '../graphql/graphql-crud.map';

@Module({
  imports: [
    // GOAL -> BornfightMediaModule.register(config),
  ],
  providers: [],
  exports: [],
})
export class MediaModule {}
