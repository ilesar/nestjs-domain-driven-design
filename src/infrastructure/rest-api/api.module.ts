import { Module } from '@nestjs/common';
import { AppController } from '@infrastructure/rest-api/controllers/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class ApiModule {}
