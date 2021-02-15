import { Module } from '@nestjs/common';
import { DomainModelsModule } from '@domain/models/domain-models.module';
import { UserService } from '@domain/services/user.service';

@Module({
  imports: [DomainModelsModule],
  providers: [UserService],
  exports: [UserService],
})
export class DomainServicesModule {}
