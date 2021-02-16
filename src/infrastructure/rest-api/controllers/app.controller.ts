import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from '@application/auth/guards/local-auth.guard';
import { AuthService } from '@application/auth/auth.service';
import { Public } from '@application/decorators/public.decorator';

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
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('data')
  getData(@Request() req) {
    return 1;
  }
}
