import { TodoItemDto } from './resources/todo-item/todo-item.dto';
import { TodoItemEntity } from '../database/entities/todo-item/todo-item.entity';

export const graphqlCrudMap = [
  {
    dto: TodoItemDto,
    entity: TodoItemEntity,
  },
];
