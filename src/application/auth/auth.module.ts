import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '@application/auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { DomainServicesModule } from '@domain/services/domain-services.module';

@Module({
  imports: [DomainServicesModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
