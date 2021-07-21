import { EntityRepository, Repository } from 'typeorm';
import { TodoItemEntity } from '../entities/todo-item/todo-item.entity';

@EntityRepository(TodoItemEntity)
export class TodoItemRepository extends Repository<TodoItemEntity> {}
