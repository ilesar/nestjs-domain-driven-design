import { AutomapperModuleOptions } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

export const automapperConfig: AutomapperModuleOptions = {
  options: [{ name: 'blah', pluginInitializer: classes }],
  singular: true,
};
