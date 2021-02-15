import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { ScheduleModule } from 'nest-schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { StatusMonitorModule } from 'nest-status-monitor';
import { StorageModule } from '@codebrew/nestjs-storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@application/config/database.config';
import statusMonitorConfig from '@application/config/status-monitor.config';
import storageConfig from '@application/config/storage.config';
import mailerConfig from '@application/config/mailer.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    MailerModule.forRoot(mailerConfig),
    StorageModule.forRoot(storageConfig),
    StatusMonitorModule.setUp(statusMonitorConfig),
    ScheduleModule.register(),
    DomainModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
