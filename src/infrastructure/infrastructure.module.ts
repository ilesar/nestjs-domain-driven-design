import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { GraphqlModule } from '@infrastructure/graphql-api/graphql.module';
import { ApplicationModule } from '@application/application.module';
import { DomainModule } from '@domain/domain.module';
import { ApiModule } from '@infrastructure/rest-api/api.module';

@Module({
  imports: [
    ApplicationModule,
    DomainModule,
    DatabaseModule,
    GraphqlModule,
    ApiModule,
  ],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
