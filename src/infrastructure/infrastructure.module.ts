import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { GraphqlModule } from '@infrastructure/graphql/graphql.module';
import { ApplicationModule } from '@application/application.module';
import { DomainModule } from '@domain/domain.module';

@Module({
  imports: [ApplicationModule, DomainModule],
  providers: [GraphqlModule, DatabaseModule],
})
export class InfrastructureModule {}
