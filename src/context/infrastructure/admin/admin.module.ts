import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from '../database/entities/todo-item/todo-item.entity';
import { TodoItemCrudController } from './resources/todo-item/todo-item.crud-controller';
import { TodoItemCrudService } from './resources/todo-item/todo-item.crud-service';
import { AdminModule as AdminJsModule } from '@adminjs/nestjs';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoItemEntity]),
    AdminJsModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [],
      },
    }),
  ],
  controllers: [TodoItemCrudController],
  providers: [TodoItemCrudService],
})
export class AdminModule {}
