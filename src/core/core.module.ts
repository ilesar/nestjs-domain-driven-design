import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { ApplicationModule } from '@application/application.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [DomainModule, InfrastructureModule, ApplicationModule],
  providers: [],
  exports: [],
})
export class CoreModule {}
