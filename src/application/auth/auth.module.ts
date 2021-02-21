import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { DomainServicesModule } from '@domain/services/domain-services.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@application/auth/strategies/jwt.strategy';
import { GraphqlAuthGuard } from '@application/auth/guards/graphql-auth-guard.service';

@Module({
  imports: [
    DomainServicesModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          privateKey: configService.get('JWT_PRIVATE_KEY'),
          publicKey: configService.get('JWT_PUBLIC_KEY'),
          signOptions: {
            expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
            issuer: 'AuthService',
            algorithm: 'RS256',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, GraphqlAuthGuard],
  exports: [AuthService, GraphqlAuthGuard],
})
export class AuthModule {}
