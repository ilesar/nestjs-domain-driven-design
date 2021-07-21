import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { TodoItemCrudController } from '@infrastructure/admin/resources/todo-item/todo-item.crud-controller';
import { TodoItemCrudService } from '@infrastructure/admin/resources/todo-item/todo-item.crud-service';

export const adminCrudConfig = [
  {
    entity: TodoItemEntity,
    controller: TodoItemCrudController,
    service: TodoItemCrudService,
  },
];
