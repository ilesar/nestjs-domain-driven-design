import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { TodoItemDto } from '@api/graphql/outputs/todo-item/todo-item.dto';
import { GraphqlAuthGuard } from '@application/auth/guards/graphql-auth-guard.service';
import { AuthResolver } from '@api/graphql/resolvers/auth.resolver';
import { AuthModule } from '@application/auth/auth.module';

@Module({
  imports: [
    AuthModule,
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
  providers: [AuthResolver],
  exports: [],
})
export class GraphqlModule {}
