import { Module } from '@nestjs/common';
import { AuthController } from '@api/rest/controllers/auth.controller';
import { AuthModule } from '@application/auth/auth.module';
import { RestCrudModule } from '@api/rest/crud/rest-crud.module';

@Module({
  imports: [AuthModule, RestCrudModule],
  controllers: [AuthController],
  providers: [],
})
export class RestModule {}
