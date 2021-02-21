import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { GraphqlModule } from '@infrastructure/api/graphql/graphql.module';
import { ApplicationModule } from '@application/application.module';
import { DomainModule } from '@domain/domain.module';
import { RestModule } from '@infrastructure/api/rest/rest.module';

@Module({
  imports: [
    ApplicationModule,
    DomainModule,
    DatabaseModule,
    GraphqlModule,
    RestModule,
  ],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
