import { Module } from '@nestjs/common';
import { DependencyGraphModule } from './dependency-graph/dependency-graph.module';
import { StatusMonitorModule } from 'nest-status-monitor';
import { statusMonitorConfig } from '../context/application/config/status-monitor.config';

@Module({
  imports: [
    DependencyGraphModule,
    StatusMonitorModule.setUp(statusMonitorConfig),
  ],
  providers: [],
  exports: [],
})
export class ToolsModule {}
