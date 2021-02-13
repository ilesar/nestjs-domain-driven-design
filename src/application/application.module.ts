import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { ScheduleModule } from 'nest-schedule';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    ScheduleModule.register(),
    DomainModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
