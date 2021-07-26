import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from 'nest-schedule';
import { StorageModule } from '@codebrew/nestjs-storage';
import { mailerConfig } from './config/mailer.config';
import { storageConfig } from './config/storage.config';
import { MediaModule } from './media/media.module';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { adminConfig } from './config/admin.config';
import { ConfigModule } from '@nestjs/config';
import { DomainLayer } from '../domain/domain.layer';
import { ApplicationLayer } from '../application/application.layer';

AdminJS.registerAdapter({ Database, Resource });

const EXTERNAL_MODULES = [
  DatabaseModule,
  GraphqlModule,
  MediaModule,
  ScheduleModule.register(),
  MailerModule.forRootAsync({ useFactory: () => mailerConfig }),
  StorageModule.forRootAsync({ useFactory: () => storageConfig }),
  AdminModule.createAdminAsync({ useFactory: () => adminConfig }),
  ConfigModule.forRoot({
    isGlobal: true,
  }),
];

@Module({
  imports: [DomainLayer, ApplicationLayer, ...EXTERNAL_MODULES],
  providers: [],
  exports: [],
})
export class InfrastructureLayer {}
