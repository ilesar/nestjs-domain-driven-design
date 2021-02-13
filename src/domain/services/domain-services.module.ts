import { Module } from '@nestjs/common';
import { DomainModelsModule } from '@domain/models/domain-models.module';

@Module({
  imports: [DomainModelsModule],
  providers: [],
})
export class DomainServicesModule {}
