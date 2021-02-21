import { Crud, CrudController } from '@nestjsx/crud';

import { TodoItemCrudService } from '@api/rest/crud/todo-item/todo-item.crud-service';
import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { JwtRestController } from '@application/decorators/jwt-rest-controller.decorator';

@Crud({
  model: {
    type: TodoItemEntity,
  },
})
@JwtRestController('todo-items', '📝')
export class TodoItemCrudController implements CrudController<TodoItemEntity> {
  constructor(public service: TodoItemCrudService) {}
}
