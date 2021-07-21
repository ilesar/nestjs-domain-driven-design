import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { graphqlCrudConfig } from '@application/config/graphql-crud.config';

@Module({
  imports: [
    // GOAL -> BornfightTransportModule.register(config),
  ],
  providers: [],
  exports: [],
})
export class TransportModule {}
