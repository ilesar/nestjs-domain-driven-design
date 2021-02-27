import { Module } from '@nestjs/common';
import { AuthController } from '@api/rest/controllers/auth.controller';
import { AuthModule } from '@application/auth/auth.module';
import { RestCrudModule } from '@api/rest/crud/rest-crud.module';
import { AuthValidator } from '@api/rest/validators/auth.validator';
import { DatabaseModule } from '@infrastructure/database/database.module';

@Module({
  imports: [AuthModule, RestCrudModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthValidator],
})
export class RestModule {}
