import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    DomainModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
