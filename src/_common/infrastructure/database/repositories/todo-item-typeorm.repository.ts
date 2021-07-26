import { EntityRepository, getRepository } from 'typeorm';
import { TodoItemEntity } from '../entities/todo-item/todo-item.entity';
import { TodoItemRepositoryInterface } from '../../../domain/interfaces/todo-item-repository.interface';
import { TodoItem } from '../../../domain/models/todo-item.model';

@EntityRepository(TodoItemEntity)
export class TodoItemTypeormRepository implements TodoItemRepositoryInterface {
  async findById(id: number): Promise<TodoItem | undefined> {
    return getRepository(TodoItemEntity).findOne({
      id,
    });
  }

  async save(model: TodoItem): Promise<TodoItem> {
    return await getRepository(TodoItemEntity).save(model);
  }
}
