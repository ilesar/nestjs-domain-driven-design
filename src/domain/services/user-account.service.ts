import { Injectable } from '@nestjs/common';
import { UserAccountModel } from '@domain/models/user-account.model';

@Injectable()
export class UserAccountService {
  private readonly userAccounts: UserAccountModel[] = [
    {
      id: 1,
      hash: 'fuum903u9m2t4qc92qtc4i9,,9tc24q,i9rtx',
      email: '123@123.123',
      username: 'adminBoi314',
      password: 'admin',
      role: {
        class: 'admin',
      },
    },
    {
      id: 2,
      hash: 'alpsjlasjfaskpfjafpkakjfspjpksjjfkafjk',
      email: 'guest',
      username: 'guest',
      password: '1234',
      role: {
        class: 'admin',
      },
    },
  ];

  async findOne(username: string): Promise<UserAccountModel | undefined> {
    return this.userAccounts.find(
      (userAccount: UserAccountModel) => userAccount.email === username,
    );
  }
}
