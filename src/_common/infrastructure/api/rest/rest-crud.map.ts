import { TodoItemEntity } from '../../database/entities/todo-item/todo-item.entity';
import { TodoItemCrudController } from './resources/todo-item/todo-item.crud-controller';
import { TodoItemCrudService } from './resources/todo-item/todo-item.crud-service';

export interface CrudMapItem {
  entity: any;
  controller: any;
  service: any;
}

export const restCrudMap: CrudMapItem[] = [
  {
    entity: TodoItemEntity,
    controller: TodoItemCrudController,
    service: TodoItemCrudService,
  },
];
