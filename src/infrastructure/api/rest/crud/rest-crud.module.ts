import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { TodoItemCrudController } from '@api/rest/crud/todo-item/todo-item.crud-controller';
import { TodoItemCrudService } from '@api/rest/crud/todo-item/todo-item.crud-service';
import { UserAccountCrudController } from '@api/rest/crud/user-account/user-account.crud-controller';
import { UserAccountCrudService } from '@api/rest/crud/user-account/user-account.crud-service';
import { UserAccountEntity } from '@infrastructure/database/entities/auth/user-account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoItemEntity]),
    TypeOrmModule.forFeature([UserAccountEntity]),
  ],
  controllers: [TodoItemCrudController, UserAccountCrudController],
  providers: [TodoItemCrudService, UserAccountCrudService],
})
export class RestCrudModule {}
