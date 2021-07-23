import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { restCrudMap } from './rest-crud.map';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      restCrudMap.map((entityItem) => entityItem.entity),
    ),
  ],
  controllers: restCrudMap.map((entityItem) => entityItem.controller),
  providers: restCrudMap.map((entityItem) => entityItem.service),
})
export class RestModule {}
