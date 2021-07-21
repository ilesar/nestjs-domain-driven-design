import {
  InternalServerErrorException,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { InfrastructureModule } from '../context/infrastructure/infrastructure.module';
import { ToolsModule } from '../tools/tools.module';

@Module({
  imports: [InfrastructureModule, ToolsModule],
  providers: [],
  exports: [],
})
export class KernelModule implements OnModuleInit {
  onModuleInit(): any {
    throw new InternalServerErrorException('test');
  }
}
