import { UserAccountModel } from '@domain/models/user-account.model';

export class UserModel {
  id: number;
  hash: string;

  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  email: string;

  userAccount: UserAccountModel;
}
