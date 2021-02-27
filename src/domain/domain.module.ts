import { Module } from '@nestjs/common';
import { UserAccountService } from '@domain/services/user-account.service';

@Module({
  imports: [],
  providers: [UserAccountService],
  exports: [UserAccountService],
})
export class DomainModule {}
