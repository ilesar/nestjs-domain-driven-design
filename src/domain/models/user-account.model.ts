import { UserModel } from '@domain/models/user.model';
import { UserRoleModel } from '@domain/models/user-role.model';
import { AccessTokenModel } from '@application/auth/models/access-token.model';

export class UserAccountModel {
  id: number;
  hash: string;

  email: string;
  username: string;
  password: string;
  user?: UserModel;

  role: UserRoleModel;
  accessToken?: AccessTokenModel;
}
