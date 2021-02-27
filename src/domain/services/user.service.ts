import { Injectable } from '@nestjs/common';
import { UserModel } from '@domain/models/user.model';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserModel | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
