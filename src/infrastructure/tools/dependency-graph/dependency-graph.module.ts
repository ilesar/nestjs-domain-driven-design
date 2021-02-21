import { INestApplication } from '@nestjs/common';
import { RoutingService } from '@infrastructure/tools/dependency-graph/services/routing.service';
import { DependencyService } from '@infrastructure/tools/dependency-graph/services/dependency.service';
import { CoreModule } from '../../../core/core.module';

export class DependencyGraphModule {
  public static globalModules: string[] = [];

  static generateGraph(application: INestApplication): void {
    const applicationModule = new DependencyService(
      application,
      CoreModule.name,
    );
    const routingService = new RoutingService(application.getHttpAdapter());

    routingService.provideDataForGraph(
      applicationModule.generateDependencyTree(),
    );
  }
}
