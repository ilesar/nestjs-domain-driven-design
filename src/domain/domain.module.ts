import { Module } from '@nestjs/common';
import { UserService } from '@domain/services/user.service';

@Module({
  imports: [],
  providers: [UserService],
  exports: [UserService],
})
export class DomainModule {}
