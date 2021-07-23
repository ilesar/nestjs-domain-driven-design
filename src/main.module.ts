import { Module } from '@nestjs/common';
import { CommonBoundedContext } from './_common/common.bounded-context';

@Module({
  imports: [CommonBoundedContext],
  providers: [],
  exports: [],
})
export class MainModule {}
