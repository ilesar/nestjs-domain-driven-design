import { HttpServer } from '@nestjs/common/interfaces/http/http-server.interface';
import { Request, Response } from 'express';
import { join } from 'path';
import { StaticFileEnum } from '../enum/static-file.enum';
import { RouteNameEnum } from '../enum/route-name.enum';

export class RoutingService {
  private readonly BASE_PATH = '/dependency-graph';

  constructor(private readonly httpServer: HttpServer) {
    this.enableCors();
    this.provideStaticFiles();
  }

  public provideDataForGraph(data: any) {
    this.httpServer.get(
      this.createRoute(RouteNameEnum.Data),
      (req: Request, res: Response) => {
        return res.json(data);
      },
    );
  }

  private enableCors() {
    this.httpServer.enableCors({
      origin: '*',
    });
  }

  private provideStaticFiles() {
    this.httpServer.get(
      this.createRoute(RouteNameEnum.Root),
      (req: Request, res: Response) => {
        RoutingService.respondWithStaticFile(res, StaticFileEnum.Html);
      },
    );

    this.httpServer.get(
      this.createRoute(StaticFileEnum.JavaScript),
      (req: Request, res: Response) => {
        RoutingService.respondWithStaticFile(res, StaticFileEnum.JavaScript);
      },
    );
  }

  private createRoute(path: string) {
    return `${this.BASE_PATH}/${path}`;
  }

  private static respondWithStaticFile(
    response: Response,
    filename: StaticFileEnum,
  ) {
    response.sendFile(
      join(
        process.cwd() + '/src/infrastructure/tools/dependency-graph',
        'static',
        filename,
      ),
    );
  }
}
