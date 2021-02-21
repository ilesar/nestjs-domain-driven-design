import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonLoggerService } from '@nest-toolbox/winston-logger';
import { DependencyGraphModule } from '@infrastructure/tools/dependency-graph/dependency-graph.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, {
    logger: new WinstonLoggerService({
      projectName: 'project',
    }),
  });

  if (process.env.APP_ENV === 'dev') {
    DependencyGraphModule.generateGraph(app);
  }

  await app.listen(3000);
}
bootstrap();
