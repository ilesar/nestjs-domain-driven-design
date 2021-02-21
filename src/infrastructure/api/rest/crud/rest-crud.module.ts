import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { TodoItemCrudController } from '@api/rest/crud/todo-item/todo-item.crud-controller';
import { TodoItemCrudService } from '@api/rest/crud/todo-item/todo-item.crud-service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItemEntity])],
  controllers: [TodoItemCrudController],
  providers: [TodoItemCrudService],
})
export class RestCrudModule {}
