import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(context);

    if (!gqlCtx.getContext().req) {
      const restCtx = context.switchToHttp().getRequest();
      return restCtx.user;
    }

    return gqlCtx.getContext().req.user;
  },
);
