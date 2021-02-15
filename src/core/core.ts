import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonLoggerService } from '@nest-toolbox/winston-logger';
import { NestEnlighten } from 'nestjs-enlighten';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, {
    logger: new WinstonLoggerService({
      projectName: 'project',
    }),
  });
  // app.useGlobalFilters(new NestEnlighten({ theme: 'theme-dark' }));
  await app.listen(3000);
}
bootstrap();
