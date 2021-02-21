import { INestApplication } from '@nestjs/common';
import { RoutingService } from '@infrastructure/tools/dependency-graph/services/routing.service';
import { DependencyService } from '@infrastructure/tools/dependency-graph/services/dependency.service';

export class DependencyGraphModule {
  public static globalModules: string[] = [];

  static generateGraph(application: INestApplication): void {
    const applicationModule = new DependencyService(application);
    const routingService = new RoutingService(application.getHttpAdapter());

    routingService.provideDataForGraph(
      applicationModule.generateDependencyTree(),
    );
  }
}
