import { Module } from '@nestjs/common';
import { DomainModelsModule } from '@domain/models/domain-models.module';
import { DomainServicesModule } from '@domain/services/domain-services.module';

@Module({
  imports: [],
  providers: [DomainModelsModule, DomainServicesModule],
  exports: [DomainServicesModule],
})
export class DomainModule {}
