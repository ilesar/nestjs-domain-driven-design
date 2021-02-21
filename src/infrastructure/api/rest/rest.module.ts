import { Module } from '@nestjs/common';
import { AuthController } from '@api/rest/controllers/auth.controller';
import { AuthModule } from '@application/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class RestModule {}
