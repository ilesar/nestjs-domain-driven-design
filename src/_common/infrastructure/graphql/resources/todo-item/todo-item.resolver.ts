import { QueryService, InjectQueryService, Filter } from '@nestjs-query/core';
import {
  ConnectionType,
  CRUDResolver,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoItemDto } from './dtos/todo-item.dto';
import { TodoItemEntity } from '../../../database/entities/todo-item/todo-item.entity';
import { TodoItemConnection, TodoItemQuery } from './todo-item.types';
import { CompleteTodoItemCommand } from '../../../../application/commands/CompleteTodoItemCommand';
import { CommandBus } from '@nestjs/cqrs';

@Resolver(() => TodoItemDto)
export class TodoItemResolver extends CRUDResolver(TodoItemDto) {
  constructor(
    @InjectQueryService(TodoItemEntity)
    readonly service: QueryService<TodoItemEntity>,
    private readonly commandBus: CommandBus,
  ) {
    super(service);
  }

  @Query(() => TodoItemConnection)
  completedTodoItems(
    @Args() query: TodoItemQuery,
  ): Promise<ConnectionType<TodoItemDto>> {
    const filter: Filter<TodoItemDto> = {
      ...query.filter,
      ...{ completed: { is: true } },
    };

    return TodoItemConnection.createFromPromise((q) => this.service.query(q), {
      ...query,
      ...{ filter },
    });
  }

  @Mutation(() => TodoItemDto)
  async completeOneTodoItem(
    @Args('todoItemId')
    todoItemId: number,
  ): Promise<TodoItemDto> {
    return this.commandBus.execute(new CompleteTodoItemCommand(todoItemId));
  }
}
