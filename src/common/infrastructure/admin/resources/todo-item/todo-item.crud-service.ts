import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TodoItemEntity } from '../../../database/entities/todo-item/todo-item.entity';

@Injectable()
export class TodoItemCrudService extends TypeOrmCrudService<TodoItemEntity> {
  constructor(@InjectRepository(TodoItemEntity) repository) {
    super(repository);
  }
}
