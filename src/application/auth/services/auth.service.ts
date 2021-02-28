import { Injectable } from '@nestjs/common';
import { AccessTokenModel } from '@application/auth/models/access-token.model';
import { ConfigService } from '@nestjs/config';
import { AccessTokenFactory } from '@application/auth/factories/access-token.factory';
import { RefreshTokenFactory } from '@application/auth/factories/refresh-token.factory';
import { UserAccountModel } from '@domain/models/user-account.model';
import { RefreshTokenEntityRepository } from '@infrastructure/database/repositories/refresh-token-entity.repository';
import { RefreshTokenEntity } from '@infrastructure/database/entities/auth/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenModel } from '@application/auth/models/refresh-token.model';
import { UserAccountEntityRepository } from '@infrastructure/database/repositories/user-account-entity.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly accessTokenFactory: AccessTokenFactory,
    private readonly refreshTokenFactory: RefreshTokenFactory,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenEntityRepository: RefreshTokenEntityRepository,
    private readonly userAccountEntityRepository: UserAccountEntityRepository,
  ) {}

  async login(user: UserAccountModel): Promise<AccessTokenModel> {
    const accessToken = this.accessTokenFactory.createTokenForUser(user);
    const refreshToken = this.refreshTokenFactory.createTokenForUser(user);

    await this.refreshTokenEntityRepository.save(refreshToken);
    this.signRefreshToken(user, refreshToken);
    accessToken.setRefreshToken(refreshToken);

    return accessToken;
  }

  private signRefreshToken(
    userAccount: UserAccountModel,
    refreshToken: RefreshTokenModel,
  ) {
    refreshToken.token = this.jwtService.sign(
      {},
      {
        expiresIn: this.config.get('REFRESH_TOKEN_EXPIRATION_TIME'),
        jwtid: refreshToken.hash ?? 'akjhadsfhkhkaskhashhsakkhasdfsak',
        subject: userAccount.hash ?? 'adjhqhwjdwbdnjwdbbwjdqjwdqnbdkwnqwjdk',
      },
    );
  }

  public async createUserAccount(userAccount: UserAccountModel) {
    await this.userAccountEntityRepository.save(userAccount);
  }
}
