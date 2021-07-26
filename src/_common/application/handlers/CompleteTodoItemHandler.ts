import { CompleteTodoItemCommand } from '../commands/CompleteTodoItemCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { TodoItemRepositoryInterface } from '../../domain/interfaces/todo-item-repository.interface';

@CommandHandler(CompleteTodoItemCommand)
export class CompleteTodoItemHandler
  implements ICommandHandler<CompleteTodoItemCommand> {
  constructor(
    @Inject('TodoItemRepositoryImplementation')
    private repository: TodoItemRepositoryInterface,
  ) {}

  async execute(command: CompleteTodoItemCommand) {
    const { todoItemId } = command;
    const todoItem = await this.repository.findById(todoItemId);

    if (!todoItem) {
      throw new NotFoundException();
    }

    todoItem.completed = true;

    return this.repository.save(todoItem);
  }
}
