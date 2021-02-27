import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '@application/auth/guards/graphql-auth-guard.service';
import { CurrentUser } from '@application/decorators/current-user.decorator';
import { UserAccountDto } from '@api/base/outputs/user-account.dto';
import { AuthService } from '@application/auth/services/auth.service';
import { LoginInput } from '@api/base/inputs/login.input';
import { AccessTokenDto } from '@api/base/outputs/access-token.dto';
import { UserModel } from '@domain/models/user.model';
import { UserAccountModel } from '@domain/models/user-account.model';

@Injectable()
@Resolver(UserAccountDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessTokenDto)
  async login(@Args('input') input: LoginInput): Promise<AccessTokenDto> {
    const user = new UserAccountModel();
    user.username = input.username;
    user.password = input.password;

    return this.authService.login(user);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => UserAccountDto)
  async me(@CurrentUser() currentUser) {
    return currentUser;
  }
  //
  // @Mutation(() => RefreshedAccessTokenDto)
  // async refresh(
  //   @Args('input') input: RefreshAccessTokenInput,
  // ): Promise<RefreshedAccessTokenDto> {
  //   return this.authService.createAccessTokenFromRefreshToken(
  //     input.refreshToken,
  //   );
  // }
}
