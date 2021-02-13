import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { GraphqlModule } from '@infrastructure/graphql/graphql.module';

@Module({
  imports: [GraphqlModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class InfrastructureModule {}
