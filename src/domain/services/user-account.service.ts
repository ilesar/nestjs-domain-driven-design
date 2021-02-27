import { Injectable } from '@nestjs/common';
import { UserAccountModel } from '@domain/models/user-account.model';
import { UserRoleEnum } from '@domain/enums/user-role.enum';

@Injectable()
export class UserAccountService {
  private readonly userAccounts: UserAccountModel[] = [
    {
      id: 1,
      hash: 'fuum903u9m2t4qc92qtc4i9,,9tc24q,i9rtx',
      username: 'adminBoi314',
      password: 'admin',
      role: UserRoleEnum.Admin,
    },
    {
      id: 2,
      hash: 'alpsjlasjfaskpfjafpkakjfspjpksjjfkafjk',
      username: 'guest',
      password: '1234',
      role: UserRoleEnum.Guest,
    },
  ];

  async findOne(username: string): Promise<UserAccountModel | undefined> {
    return this.userAccounts.find(
      (userAccount: UserAccountModel) => userAccount.username === username,
    );
  }
}
