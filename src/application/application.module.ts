import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { ConfigModule } from '@nestjs/config';

const INTEGRATIONS = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
];

@Module({
  imports: [DomainModule, ...INTEGRATIONS],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
