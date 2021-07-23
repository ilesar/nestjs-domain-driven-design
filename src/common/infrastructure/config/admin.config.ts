import { TodoItemEntity } from '../database/entities/todo-item/todo-item.entity';
import { AdminModuleOptions } from '@adminjs/nestjs';

export const adminConfig: AdminModuleOptions = {
  adminJsOptions: {
    rootPath: '/admin',
    resources: [TodoItemEntity],
  },
  auth: {
    authenticate: async (email, password) => {
      return Promise.resolve({ email: 'test' });
    },
    cookieName: 'test',
    cookiePassword: 'testPass',
  },
};
