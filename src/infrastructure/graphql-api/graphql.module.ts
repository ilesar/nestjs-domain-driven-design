import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { TodoItemDto } from '@infrastructure/graphql-api/outputs/todo-item/todo-item.dto';
import { GraphqlAuthGuard } from '@application/auth/guards/graphql-auth-guard.service';
import { TestResolver } from '@infrastructure/graphql-api/resolvers/test.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([TodoItemEntity])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: TodoItemDto,
          EntityClass: TodoItemEntity,
          guards: [GraphqlAuthGuard],
        },
      ],
    }),
  ],
  providers: [TestResolver],
  exports: [],
})
export class GraphqlModule {}
