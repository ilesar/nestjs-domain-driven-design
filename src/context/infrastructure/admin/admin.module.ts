import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminCrudConfig } from '../../application/config/admin-crud.config';
import { TodoItemEntity } from '../database/entities/todo-item/todo-item.entity';
import { TodoItemCrudController } from './resources/todo-item/todo-item.crud-controller';
import { TodoItemCrudService } from './resources/todo-item/todo-item.crud-service';

// AdminJS.registerAdapter({ Database, Resource });
// Resource.validate = validate;

@Module({
  imports: [TypeOrmModule.forFeature([TodoItemEntity])],
  controllers: [TodoItemCrudController],
  providers: [TodoItemCrudService],
})
// @Module({
//   imports: [
//     // GOAL -> BornfightAdminModule.register(config),
//     TypeOrmModule.forFeature(
//       adminCrudConfig.map((entityItem) => entityItem.entity),
//     ),
//     // AdminJsModule.createAdminAsync({
//     //   imports: [TypeOrmModule.forFeature([TodoItemEntity])],
//     //   inject: [getRepositoryToken(TodoItemEntity)],
//     //   useFactory: (connection: Connection) => ({
//     //     adminJsOptions: {
//     //       rootPath: '/admin',
//     //       databases: [connection],
//     //       // resources: [{ resource: repository }],
//     //     },
//     //     auth: {
//     //       authenticate: async (email, password) =>
//     //         Promise.resolve({ email: 'test' }),
//     //       cookieName: 'test',
//     //       cookiePassword: 'testPass',
//     //     },
//     //   }),
//     // }),
//   ],
//   controllers: adminCrudConfig.map((entityItem) => {
//     return entityItem.controller;
//   }),
//   providers: adminCrudConfig.map((entityItem) => entityItem.service),
// })
export class AdminModule {}
