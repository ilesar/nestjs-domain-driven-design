import { TodoItemDto } from '../../infrastructure/graphql/resources/todo-item/todo-item.dto';
import { TodoItemEntity } from '../../infrastructure/database/entities/todo-item/todo-item.entity';

export const graphqlCrudConfig = [
  {
    dto: TodoItemDto,
    entity: TodoItemEntity,
  },
];
