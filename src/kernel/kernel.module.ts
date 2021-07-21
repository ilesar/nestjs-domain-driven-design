import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../context/infrastructure/infrastructure.module';
import { ToolsModule } from '../tools/tools.module';

@Module({
  imports: [InfrastructureModule, ToolsModule],
  providers: [],
  exports: [],
})
export class KernelModule {}
