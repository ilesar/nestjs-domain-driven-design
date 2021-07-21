import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApplicationModule } from '../application/application.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlModule } from './graphql/graphql.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from 'nest-schedule';
import { StorageModule } from '@codebrew/nestjs-storage';
import { AutomapperModule } from '@automapper/nestjs';
import { automapperConfig } from '../application/config/automapper.config';
import { mailerConfig } from '../application/config/mailer.config';
import { databaseConfig } from '../application/config/database.config';
import { storageConfig } from '../application/config/storage.config';

const INTEGRATIONS = [
  GraphqlModule,
  AdminModule,
  MailerModule.forRoot(mailerConfig),
  TypeOrmModule.forRoot(databaseConfig),
  ScheduleModule.register(),
  StorageModule.forRoot(storageConfig),
  AutomapperModule.forRoot(automapperConfig),
];

@Module({
  imports: [ApplicationModule, DatabaseModule, ...INTEGRATIONS],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
