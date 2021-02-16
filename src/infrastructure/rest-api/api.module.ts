import { Module } from '@nestjs/common';
import { AppController } from '@infrastructure/rest-api/controllers/app.controller';
import { AuthModule } from '@application/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [],
})
export class ApiModule {}
