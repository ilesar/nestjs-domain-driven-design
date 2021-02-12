import { Module } from '@nestjs/common';
import { GraphqlModule } from '@infrastructure/graphql/api.module';
import { DatabaseModule } from '@infrastructure/database/database.module';

@Module({
  imports: [GraphqlModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class InfrastructureModule {}
