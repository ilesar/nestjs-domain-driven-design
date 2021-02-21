import { Injectable } from '@nestjs/common';
import { UserService } from '@domain/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenModel } from '@application/auth/models/access-token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
    };

    const accessToken = new AccessTokenModel();
    accessToken.token = this.jwtService.sign(payload);

    return accessToken;
  }
}
