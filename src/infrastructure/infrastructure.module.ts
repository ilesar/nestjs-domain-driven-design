import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { ApplicationModule } from '@application/application.module';
import { AdminModule } from '@infrastructure/admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlModule } from '@infrastructure/graphql/graphql.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as mailerConfig from '@application/config/mailer.config';
import * as databaseConfig from '@application/config/database.config';
import { ScheduleModule } from 'nest-schedule';
import { StorageModule } from '@codebrew/nestjs-storage';
import * as storageConfig from '@application/config/storage.config';

const INTEGRATIONS = [
  GraphqlModule,
  AdminModule,
  MailerModule.forRoot(mailerConfig),
  TypeOrmModule.forRoot(databaseConfig),
  ScheduleModule.register(),
  StorageModule.forRoot(storageConfig),
];

@Module({
  imports: [ApplicationModule, DatabaseModule, ...INTEGRATIONS],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
