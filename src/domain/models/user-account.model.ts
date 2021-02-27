import { UserModel } from '@domain/models/user.model';
import { UserRoleModel } from '@domain/models/user-role.model';

export class UserAccountModel {
  id: number;
  hash: string;

  email: string;
  username: string;
  password: string;
  user?: UserModel;

  role: UserRoleModel;
}
