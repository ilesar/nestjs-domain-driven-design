import { UserAccountModel } from '@domain/models/user-account.model';
import { UserAccountEntityRepository } from '@infrastructure/database/repositories/user-account-entity.repository';
import { AuthenticationExeception } from '@api/rest/exceptions/authentication.exeception';
import * as argon2 from 'argon2';
import { UserAccountEntity } from '@infrastructure/database/entities/auth/user-account.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthValidator {
  constructor(
    private readonly userAccountRepository: UserAccountEntityRepository,
  ) {}
  public async resolveUserAccount(
    userAccountModel: UserAccountModel,
  ): Promise<UserAccountEntity> {
    const userAccountEntity = await this.fetchUserAccountEntity(
      userAccountModel,
    );

    const isCorrectPassword = await this.verifyPassword(
      userAccountModel,
      userAccountEntity,
    );

    if (!isCorrectPassword) {
      throw new AuthenticationExeception();
    }

    return userAccountEntity;
  }

  private async fetchUserAccountEntity(userAccountModel: UserAccountModel) {
    const userAccountEntity = await this.userAccountRepository.findOne({
      where: {
        username: userAccountModel.username,
      },
    });

    if (!userAccountEntity) {
      throw new AuthenticationExeception();
    }

    return userAccountEntity;
  }

  private async verifyPassword(
    userAccountModel: UserAccountModel,
    userAccountEntity: UserAccountEntity,
  ): Promise<boolean> {
    return argon2.verify(userAccountEntity.password, userAccountModel.password);
  }
}
