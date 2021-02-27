import { Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from '@application/auth/services/auth.service';
import { CurrentUser } from '@application/decorators/current-user.decorator';
import { JwtAuthGuard } from '@application/auth/guards/jwt-auth.guard';
import { AccessTokenDto } from '@api/base/outputs/access-token.dto';
import { UserAccountDto } from '@api/base/outputs/user-account.dto';
import { RestController } from '@application/decorators/rest-controller.decorator';
import { UserAccountModel } from '@domain/models/user-account.model';
import addCustomEqualityTester = jasmine.addCustomEqualityTester;
import { RefreshTokenDto } from '@api/base/outputs/refresh-token.dto';

@RestController('auth', '🔐')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body): Promise<AccessTokenDto> {
    const accessToken = await this.authService.login(body);

    const dto = new AccessTokenDto();
    dto.token = accessToken.token;
    dto.expiresIn = accessToken.expiresIn;
    dto.refreshToken = new RefreshTokenDto();
    dto.refreshToken.token = accessToken.refreshToken.token;
    dto.refreshToken.expiresIn = accessToken.refreshToken.expiresIn;

    return dto;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(
    @CurrentUser() currentUserAccount: UserAccountModel,
  ): Promise<UserAccountDto> {
    return currentUserAccount;
  }
}
