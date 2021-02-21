import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from '@application/auth/guards/local-auth.guard';
import { AuthService } from '@application/auth/auth.service';
import { Public } from '@application/decorators/public.decorator';
import { CurrentUser } from '@application/decorators/current-user.decorator';
import { User } from '@domain/models/user.model';
import { JwtAuthGuard } from '@application/auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getData(@Request() req, @CurrentUser() currentUser: User) {
    // return req.user;
    return currentUser;
  }
}
