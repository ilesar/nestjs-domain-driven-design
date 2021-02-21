import { UseGuards, Get } from '@nestjs/common';
import { CurrentUser } from '@application/decorators/current-user.decorator';
import { User } from '@domain/models/user.model';
import { JwtAuthGuard } from '@application/auth/guards/jwt-auth.guard';
import { UserDto } from '@api/base/outputs/user.dto';
import { JwtRestController } from '@application/decorators/jwt-rest-controller.decorator';

@JwtRestController('todo', '📝')
export class TodoController {
  @Get('')
  @UseGuards(JwtAuthGuard)
  async getData(@CurrentUser() currentUser: User): Promise<UserDto> {
    return currentUser;
  }
}
