import { Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from '@application/auth/services/auth.service';
import { CurrentUser } from '@application/decorators/current-user.decorator';
import { UserModel } from '@domain/models/user.model';
import { JwtAuthGuard } from '@application/auth/guards/jwt-auth.guard';
import { AccessTokenDto } from '@api/base/outputs/access-token.dto';
import { UserDto } from '@api/base/outputs/user.dto';
import { RestController } from '@application/decorators/rest-controller.decorator';

@RestController('auth', '🔐')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body): Promise<AccessTokenDto> {
    return this.authService.login(body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getData(@CurrentUser() currentUser: UserModel): Promise<UserDto> {
    return currentUser;
  }
}
