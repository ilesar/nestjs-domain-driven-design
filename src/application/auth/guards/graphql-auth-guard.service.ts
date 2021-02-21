import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@domain/models/user.model';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean {
    return <boolean>super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err: Error, user: User): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
