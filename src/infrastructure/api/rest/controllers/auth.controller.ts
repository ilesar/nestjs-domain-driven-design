import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '@application/auth/services/auth.service';
import { CurrentUser } from '@application/decorators/current-user.decorator';
import { User } from '@domain/models/user.model';
import { JwtAuthGuard } from '@application/auth/guards/jwt-auth.guard';
import { AccessTokenDto } from '@api/base/outputs/access-token.dto';
import { UserDto } from '@api/base/outputs/user.dto';
import { RestController } from '@application/decorators/rest-controller.decorator';

@RestController('authorization', '🔐')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() request): Promise<AccessTokenDto> {
    return this.authService.login(request.body);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getData(@CurrentUser() currentUser: User): Promise<UserDto> {
    return currentUser;
  }
}
