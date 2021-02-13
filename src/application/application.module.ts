import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { ScheduleModule } from 'nest-schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
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
    ScheduleModule.register(),
    DomainModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
