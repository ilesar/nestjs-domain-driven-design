import { Module } from '@nestjs/common';
import { AuthController } from '@api/rest/controllers/auth.controller';
import { AuthModule } from '@application/auth/auth.module';
import { TodoController } from '@api/rest/controllers/todo.controller';
import { RestCrudModule } from '@api/rest/crud/rest-crud.module';

@Module({
  imports: [AuthModule, RestCrudModule],
  controllers: [AuthController, TodoController],
  providers: [],
})
export class RestModule {}
