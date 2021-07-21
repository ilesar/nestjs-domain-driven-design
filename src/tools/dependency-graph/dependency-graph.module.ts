import { INestApplication } from '@nestjs/common';
import { RoutingService } from './services/routing.service';
import { DependencyService } from './services/dependency.service';

export class DependencyGraphModule {
  static generateGraph(
    application: INestApplication,
    appModuleName: string,
  ): void {
    const applicationModule = new DependencyService(application, appModuleName);
    const routingService = new RoutingService(application.getHttpAdapter());

    routingService.provideDataForGraph(
      applicationModule.generateDependencyTree(),
    );
  }
}
