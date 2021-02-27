import { Injectable } from '@nestjs/common';
import { AccessTokenModel } from '@application/auth/models/access-token.model';
import { ConfigService } from '@nestjs/config';
import { AccessTokenFactory } from '@application/auth/factories/access-token.factory';
import { RefreshTokenFactory } from '@application/auth/factories/refresh-token.factory';
import { UserAccountModel } from '@domain/models/user-account.model';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private accessTokenFactory: AccessTokenFactory,
    private refreshTokenFactory: RefreshTokenFactory,
  ) {}

  async login(user: UserAccountModel): Promise<AccessTokenModel> {
    const accessToken = this.accessTokenFactory.createTokenForUser(user);

    accessToken.setRefreshToken(
      this.refreshTokenFactory.createTokenForUser(user),
    );

    return accessToken;
  }
}
