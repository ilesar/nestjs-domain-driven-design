import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { TodoItemEntity } from '../../../database/entities/todo-item/todo-item.entity';
import { TodoItemDto } from './dtos/todo-item.dto';

@Assembler(TodoItemDto, TodoItemEntity)
export class TodoItemAssembler extends ClassTransformerAssembler<
  TodoItemDto,
  TodoItemEntity
> {
  convertToDTO(entity: TodoItemEntity): TodoItemDto {
    console.log('test');
    return super.convertToDTO(entity);
  }
}
