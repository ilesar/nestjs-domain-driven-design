import { Module } from '@nestjs/common';
import { AuthController } from '@api/rest/controllers/auth.controller';
import { AuthModule } from '@application/auth/auth.module';
import { TodoController } from '@api/rest/controllers/todo.controller';

@Module({
  imports: [AuthModule],
  controllers: [AuthController, TodoController],
  providers: [],
})
export class RestModule {}
