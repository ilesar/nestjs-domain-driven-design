import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '@application/auth/services/auth.service';
import { CurrentUser } from '@application/decorators/current-user.decorator';
import { User } from '@domain/models/user.model';
import { JwtAuthGuard } from '@application/auth/guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() request) {
    return this.authService.login(request.body);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getData(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
