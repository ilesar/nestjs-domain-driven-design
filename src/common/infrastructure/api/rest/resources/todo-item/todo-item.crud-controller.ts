import { Crud, CrudController } from '@nestjsx/crud';

import { TodoItemCrudService } from './todo-item.crud-service';
import { TodoItemEntity } from '../../../../database/entities/todo-item/todo-item.entity';
import { RestController } from '../../../../../application/decorators/rest-controller.decorator';

@Crud({
  model: {
    type: TodoItemEntity,
  },
})
@RestController('todo-items', '📝')
export class TodoItemCrudController implements CrudController<TodoItemEntity> {
  constructor(public service: TodoItemCrudService) {}
}
