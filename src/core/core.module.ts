import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    InfrastructureModule,
    AutomapperModule.forRoot({
      options: [{ name: 'blah', pluginInitializer: classes }],
      singular: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
