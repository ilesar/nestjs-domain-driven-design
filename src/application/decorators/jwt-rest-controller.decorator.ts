import { applyDecorators, UseGuards } from '@nestjs/common';
import { RestController } from '@application/decorators/rest-controller.decorator';
import { JwtAuthGuard } from '@application/auth/guards/jwt-auth.guard';

export function JwtRestController(
  controllerName: string,
  controllerIcon?: string,
) {
  return applyDecorators(
    RestController(controllerName, controllerIcon),
    UseGuards(JwtAuthGuard),
  );
}
