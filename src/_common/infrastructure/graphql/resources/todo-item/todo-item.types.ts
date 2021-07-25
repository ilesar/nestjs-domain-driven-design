import { ArgsType } from '@nestjs/graphql';
import { QueryArgsType } from '@nestjs-query/query-graphql';
import { TodoItemDto } from './dtos/todo-item.dto';

@ArgsType()
export class TodoItemQuery extends QueryArgsType(TodoItemDto) {}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const TodoItemConnection = TodoItemQuery.ConnectionType;
