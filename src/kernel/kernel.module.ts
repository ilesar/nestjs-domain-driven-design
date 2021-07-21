import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../context/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [],
  exports: [],
})
export class KernelModule {}
