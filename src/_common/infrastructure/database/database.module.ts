import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as databaseConfig from '../config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig)],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
