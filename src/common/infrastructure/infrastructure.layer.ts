import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RestModule } from './api/rest/rest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlModule } from './api/graphql/graphql.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from 'nest-schedule';
import { StorageModule } from '@codebrew/nestjs-storage';
import { AutomapperModule } from '@automapper/nestjs';
import { automapperConfig } from './config/automapper.config';
import { mailerConfig } from './config/mailer.config';
import { databaseConfig } from './config/database.config';
import { storageConfig } from './config/storage.config';
import { MediaModule } from './media/media.module';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { adminConfig } from './config/admin.config';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    DatabaseModule,
    GraphqlModule,
    RestModule,
    MediaModule,
    ScheduleModule.register(),
    TypeOrmModule.forRoot(databaseConfig),
    AutomapperModule.forRoot(automapperConfig),
    MailerModule.forRootAsync({ useFactory: () => mailerConfig }),
    StorageModule.forRootAsync({ useFactory: () => storageConfig }),
    AdminModule.createAdminAsync({ useFactory: () => adminConfig }),
  ],
  providers: [],
  exports: [],
})
export class InfrastructureLayer {}
