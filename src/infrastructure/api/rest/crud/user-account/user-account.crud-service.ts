import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TodoItemEntity } from '@infrastructure/database/entities/todo-item/todo-item.entity';
import { UserAccountEntity } from '@infrastructure/database/entities/auth/user-account.entity';

@Injectable()
export class UserAccountCrudService extends TypeOrmCrudService<UserAccountEntity> {
  constructor(@InjectRepository(UserAccountEntity) repository) {
    super(repository);
  }
}
