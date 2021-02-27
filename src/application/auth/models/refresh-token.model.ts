import { UserAccountModel } from '@domain/models/user-account.model';

export class RefreshTokenModel {
  id?: number;
  hash?: string;
  token: string;
  expiresIn: Date;
  isRevoked: boolean;
  userAccount: UserAccountModel;
}
