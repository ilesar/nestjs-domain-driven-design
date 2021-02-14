import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { ScheduleModule } from 'nest-schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { StatusMonitorModule } from 'nest-status-monitor';
import { DriverType, StorageModule } from '@codebrew/nestjs-storage';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database.config'),
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from: `"nest-modules" <modules@nestjs.com>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    StorageModule.forRoot({
      default: 'local',
      disks: {
        local: {
          driver: DriverType.LOCAL,
          config: {
            root: process.cwd(),
          },
        },
      },
    }),
    StatusMonitorModule.setUp({
      pageTitle: 'Nest.js Monitoring Page',
      port: 3000,
      path: '/status',
      ignoreStartsWith: '/health/alive',
      spans: [
        {
          interval: 1, // Every second
          retention: 60, // Keep 60 datapoints in memory
        },
        {
          interval: 5, // Every 5 seconds
          retention: 60,
        },
        {
          interval: 15, // Every 15 seconds
          retention: 60,
        },
      ],
      chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
      },
      healthChecks: [],
    }),
    ScheduleModule.register(),
    DomainModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
