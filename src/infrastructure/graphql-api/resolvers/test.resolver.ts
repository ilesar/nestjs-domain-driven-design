import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '@application/auth/guards/graphql-auth-guard.service';
import { CurrentUser } from '@application/decorators/current-user.decorator';
import { User } from '@domain/models/user.model';
import { TodoItemDto } from '@infrastructure/graphql-api/outputs/todo-item/todo-item.dto';
import { Public } from '@application/decorators/public.decorator';
import { UserDto } from '@infrastructure/graphql-api/outputs/user/user.dto';

@Resolver(TodoItemDto)
export class TestResolver {
  @Query(() => UserDto)
  @UseGuards(GraphqlAuthGuard)
  async testAction(@CurrentUser() currentUser: User): Promise<UserDto> {
    return currentUser;
  }
}
