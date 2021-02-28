import { SeedInterface } from '@infrastructure/database/interfaces/seed.interface';
import { UserRoleEnum } from '@domain/enums/user-role.enum';
import { UserAccountModel } from '@domain/models/user-account.model';
import { AuthService } from '@application/auth/services/auth.service';

export class UserAccountSeed implements SeedInterface {
  constructor(private readonly authService: AuthService) {}

  private readonly DATA: UserAccountModel[] = [
    {
      username: 'admin',
      password: 'admin',
      role: UserRoleEnum.Admin,
    },
    {
      username: 'guest',
      password: '12345',
      role: UserRoleEnum.Guest,
    },
  ];

  async processData(): Promise<void> {
    for (const userAccountModel of this.DATA) {
      await this.authService.createUserAccount(userAccountModel);
    }
  }
}
