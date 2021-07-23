import { Module } from '@nestjs/common';
import { CommonBoundedContext } from './common/common.bounded-context';

@Module({
  imports: [CommonBoundedContext],
  providers: [],
  exports: [],
})
export class MainModule {}
