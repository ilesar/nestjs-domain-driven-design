import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function RestController(
  controllerName: string,
  controllerIcon?: string,
) {
  let prettyControllerName =
    controllerName.charAt(0).toUpperCase() + controllerName.slice(1);

  if (controllerIcon) {
    prettyControllerName = `${controllerIcon} ${prettyControllerName}`;
  }

  return applyDecorators(
    ApiTags(prettyControllerName),
    Controller(controllerName),
  );
}
