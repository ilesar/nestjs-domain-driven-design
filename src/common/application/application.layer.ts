import { Module } from '@nestjs/common';
import { DomainLayer } from '../domain/domain.layer';
import { ConfigModule } from '@nestjs/config';

const INTEGRATIONS = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
];

@Module({
  imports: [...INTEGRATIONS],
  providers: [],
  exports: [],
})
export class ApplicationLayer {}
