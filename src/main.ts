import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonLoggerService } from '@nest-toolbox/winston-logger';
import { DependencyGraphModule } from './_common/infrastructure/dependency-graph/dependency-graph.module';
import * as sourceMapSupport from 'source-map-support';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule, {
    logger: new WinstonLoggerService({
      projectName: 'project',
    }),
  });

  sourceMapSupport.install();

  if (process.env.APP_ENV === 'dev') {
    DependencyGraphModule.generateGraph(app, MainModule.name);
  }

  await app.listen(3000);
}
bootstrap();
