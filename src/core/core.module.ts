import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';
import { ApplicationModule } from '@application/application.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [],
  controllers: [DomainModule, ApplicationModule, InfrastructureModule],
  providers: [],
})
export class CoreModule {}
