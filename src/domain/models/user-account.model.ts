import { UserModel } from '@domain/models/user.model';
import { AccessTokenModel } from '@application/auth/models/access-token.model';
import { UserRoleEnum } from '@domain/enums/user-role.enum';

export class UserAccountModel {
  id?: number;
  hash?: string;

  username: string;
  password: string;

  role: UserRoleEnum;
  user?: UserModel;
  accessToken?: AccessTokenModel;
}
