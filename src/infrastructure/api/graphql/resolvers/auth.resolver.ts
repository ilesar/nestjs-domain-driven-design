import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '@application/auth/guards/graphql-auth-guard.service';
import { CurrentUser } from '@application/decorators/current-user.decorator';
import { UserDto } from '@api/base/outputs/user.dto';
import { AuthService } from '@application/auth/services/auth.service';
import { LoginInput } from '@api/base/inputs/login.input';
import { AccessTokenDto } from '@api/base/outputs/access-token.dto';

@Injectable()
@Resolver(UserDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessTokenDto)
  async login(@Args('input') input: LoginInput): Promise<AccessTokenDto> {
    return this.authService.login(input);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => UserDto)
  async profile(@CurrentUser() currentUser) {
    return currentUser;
  }
}
