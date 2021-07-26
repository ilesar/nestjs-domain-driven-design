import { TodoItem } from '../models/todo-item.model';

export interface TodoItemRepositoryInterface {
  findById: (id: number) => Promise<TodoItem | undefined>;
  save: (model: TodoItem) => Promise<TodoItem>;
}
