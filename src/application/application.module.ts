import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { ScheduleModule } from 'nest-schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { StatusMonitorModule } from 'nest-status-monitor';
import { StorageModule } from '@codebrew/nestjs-storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as databaseConfig from '@application/config/database.config';
import * as statusMonitorConfig from '@application/config/status-monitor.config';
import * as storageConfig from '@application/config/storage.config';
import * as mailerConfig from '@application/config/mailer.config';
import * as graphQLConfig from '@application/config/graphQL.config';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@application/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    MailerModule.forRoot(mailerConfig),
    StorageModule.forRoot(storageConfig),
    StatusMonitorModule.setUp(statusMonitorConfig),
    ScheduleModule.register(),
    GraphQLModule.forRootAsync(graphQLConfig),
    AuthModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
