import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminCrudConfig } from '@application/config/admin-crud.config';

// AdminJS.registerAdapter({ Database, Resource });
// Resource.validate = validate;

@Module({
  imports: [
    TypeOrmModule.forFeature(
      adminCrudConfig.map((entityItem) => entityItem.entity),
    ),
    // AdminJsModule.createAdminAsync({
    //   imports: [TypeOrmModule.forFeature([TodoItemEntity])],
    //   inject: [getRepositoryToken(TodoItemEntity)],
    //   useFactory: (connection: Connection) => ({
    //     adminJsOptions: {
    //       rootPath: '/admin',
    //       databases: [connection],
    //       // resources: [{ resource: repository }],
    //     },
    //     auth: {
    //       authenticate: async (email, password) =>
    //         Promise.resolve({ email: 'test' }),
    //       cookieName: 'test',
    //       cookiePassword: 'testPass',
    //     },
    //   }),
    // }),
  ],
  controllers: adminCrudConfig.map((entityItem) => entityItem.controller),
  providers: adminCrudConfig.map((entityItem) => entityItem.service),
})
export class AdminModule {}
