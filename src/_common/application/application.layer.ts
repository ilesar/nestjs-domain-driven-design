import { Module } from '@nestjs/common';
import { CompleteTodoItemHandler } from './handlers/CompleteTodoItemHandler';
import { DomainLayer } from '../domain/domain.layer';
import { TodoItemTypeormRepository } from '../infrastructure/database/repositories/todo-item-typeorm.repository';

@Module({
  imports: [DomainLayer],
  providers: [
    CompleteTodoItemHandler,
    {
      provide: 'TodoItemRepositoryImplementation',
      useClass: TodoItemTypeormRepository,
    },
  ],
  exports: [],
})
export class ApplicationLayer {}
