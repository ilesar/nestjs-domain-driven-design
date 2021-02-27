import { Crud, CrudController } from '@nestjsx/crud';

import { TodoItemCrudService } from '@api/rest/crud/todo-item/todo-item.crud-service';
import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { JwtRestController } from '@application/decorators/jwt-rest-controller.decorator';
import { UserAccountEntity } from '@infrastructure/database/entities/auth/user-account.entity';
import { UserAccountService } from '@domain/services/user-account.service';
import { UserAccountCrudService } from '@api/rest/crud/user-account/user-account.crud-service';

@Crud({
  model: {
    type: UserAccountEntity,
  },
})
@JwtRestController('user-accounts', '👤')
export class UserAccountCrudController
  implements CrudController<UserAccountEntity> {
  constructor(public service: UserAccountCrudService) {}
}
