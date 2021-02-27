import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphqlAuthGuard } from '@application/auth/guards/graphql-auth-guard.service';
import { DomainModule } from '@domain/domain.module';
import { AccessTokenFactory } from '@application/auth/factories/access-token.factory';
import { RefreshTokenFactory } from '@application/auth/factories/refresh-token.factory';

@Module({
  imports: [
    DomainModule,
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
  providers: [
    AuthService,
    GraphqlAuthGuard,
    AccessTokenFactory,
    RefreshTokenFactory,
  ],
  exports: [AuthService, GraphqlAuthGuard],
})
export class AuthModule {}
