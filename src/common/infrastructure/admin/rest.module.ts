import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from '../database/entities/todo-item/todo-item.entity';
import { TodoItemCrudController } from './resources/todo-item/todo-item.crud-controller';
import { TodoItemCrudService } from './resources/todo-item/todo-item.crud-service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItemEntity])],
  controllers: [TodoItemCrudController],
  providers: [TodoItemCrudService],
})
export class RestModule {}
