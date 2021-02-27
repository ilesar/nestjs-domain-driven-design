import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenModel } from '@application/auth/models/refresh-token.model';
import { UserAccountModel } from '@domain/models/user-account.model';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class RefreshTokenFactory {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  createTokenForUser(userAccount: UserAccountModel): RefreshTokenModel {
    const refreshToken = new RefreshTokenModel();
    refreshToken.isRevoked = false;
    refreshToken.expiresIn = this.calculateRefreshTokenExpirationTime();
    refreshToken.userAccount = userAccount;

    return refreshToken;
  }

  private calculateRefreshTokenExpirationTime(): Date {
    const lengthOfExpirationTimeout = this.config.get(
      'REFRESH_TOKEN_EXPIRATION_TIME',
    );

    return DateTime.local()
      .plus({ seconds: lengthOfExpirationTimeout })
      .toJSDate();
  }
}
