import { JwtService } from '@nestjs/jwt';
import { AccessTokenModel } from '@application/auth/models/access-token.model';
import { ConfigService } from '@nestjs/config';
import { UserAccountModel } from '@domain/models/user-account.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessTokenFactory {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  createTokenForUser(userAccount: UserAccountModel): AccessTokenModel {
    const accessToken = new AccessTokenModel();
    accessToken.token = this.jwtService.sign({
      id: userAccount.id,
      role: userAccount.role,
    });
    accessToken.expiresIn = this.calculateAccessTokenExpirationTime();

    return accessToken;
  }

  private calculateAccessTokenExpirationTime(): number {
    return this.config.get('JWT_EXPIRATION_TIME');
  }
}
