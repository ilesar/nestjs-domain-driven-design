import { Module } from '@nestjs/common';
import { InfrastructureLayer } from './infrastructure/infrastructure.layer';

@Module({
  imports: [InfrastructureLayer],
  providers: [],
  exports: [],
})
export class CommonBoundedContext {}
