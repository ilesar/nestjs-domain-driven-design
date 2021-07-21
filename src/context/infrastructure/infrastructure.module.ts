import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApplicationModule } from '../application/application.module';
import { RestModule } from './admin/rest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlModule } from './graphql/graphql.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from 'nest-schedule';
import { StorageModule } from '@codebrew/nestjs-storage';
import { AutomapperModule } from '@automapper/nestjs';
import { automapperConfig } from '../application/config/automapper.config';
import { mailerConfig } from '../application/config/mailer.config';
import { databaseConfig } from '../application/config/database.config';
import { storageConfig } from '../application/config/storage.config';
import { TransportModule } from './transport/transport.module';
import { MediaModule } from './media/media.module';
import { TodoItemEntity } from './database/entities/todo-item/todo-item.entity';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';

const INTEGRATIONS = [
  GraphqlModule,
  RestModule,
  TransportModule,
  MediaModule,
  ScheduleModule.register(),
  TypeOrmModule.forRoot(databaseConfig),
  AutomapperModule.forRoot(automapperConfig),
  MailerModule.forRootAsync({ useFactory: () => mailerConfig }),
  StorageModule.forRootAsync({ useFactory: () => storageConfig }),
  AdminModule.createAdmin({
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
  }),
];

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [ApplicationModule, DatabaseModule, ...INTEGRATIONS],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
