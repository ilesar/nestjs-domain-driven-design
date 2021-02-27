import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@api/rest/controllers/auth.controller';
import { AuthService } from '@application/auth/services/auth.service';
import { AccessTokenModel } from '@application/auth/models/access-token.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DomainModule } from '@domain/domain.module';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        DomainModule,
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
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should login as admin', async () => {
      const result: AccessTokenModel = {
        token: 'test',
      };
      console.log(authService);
      console.log(authController);
      jest.spyOn(authService, 'login').mockImplementation(async () => result);

      expect(
        await authController.login({
          username: 'admin',
          password: 'admin',
        }),
      ).toBe(result);
    });
  });
});
