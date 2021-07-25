import { Module } from '@nestjs/common';
import { InfrastructureLayer } from './infrastructure/infrastructure.layer';
import { ApplicationLayer } from './application/application.layer';
import { DomainLayer } from './domain/domain.layer';

@Module({
  imports: [DomainLayer, ApplicationLayer, InfrastructureLayer],
  providers: [],
  exports: [],
})
export class CommonBoundedContext {}
