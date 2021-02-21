import { Module } from '@nestjs/common';
import { AuthResolver } from '@api/graphql/resolvers/auth.resolver';
import { AuthModule } from '@application/auth/auth.module';
import { GraphqlCrudModule } from '@api/graphql/crud/graphql-crud.module';

@Module({
  imports: [AuthModule, GraphqlCrudModule],
  providers: [AuthResolver],
  exports: [],
})
export class GraphqlModule {}
