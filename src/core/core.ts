import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonLoggerService } from '@nest-toolbox/winston-logger';
import { DependencyGraphModule } from '@infrastructure/tools/dependency-graph/dependency-graph.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RestModule } from '@api/rest/rest.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, {
    logger: new WinstonLoggerService({
      projectName: 'project',
    }),
  });

  if (process.env.APP_ENV === 'dev') {
    DependencyGraphModule.generateGraph(app, CoreModule.name);
  }

  const config = new DocumentBuilder()
    .setTitle(`${process.env.PROJECT_NAME}`)
    .setDescription(
      `REST API Documentation for the project ${process.env.PROJECT_NAME}<br><br><br>Are you looking for the <a href="/graphql" target="_blank">GraphQL documentation</a>?`,
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [RestModule],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
