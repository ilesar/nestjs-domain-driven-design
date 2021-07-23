import { Module } from '@nestjs/common';
import { InfrastructureLayer } from './infrastructure/infrastructure.layer';
import { ApplicationLayer } from './application/application.layer';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule, ApplicationLayer, InfrastructureLayer],
  providers: [],
  exports: [],
})
export class CommonBoundedContext {}
