import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@application/auth/guards/local-auth.guard';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
