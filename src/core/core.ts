import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonLoggerService } from '@nest-toolbox/winston-logger';
import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, {
    logger: new WinstonLoggerService({
      projectName: 'project',
    }),
  });
  await app.listen(3000);
}
bootstrap();
