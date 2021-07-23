import { Module, OnModuleInit } from '@nestjs/common';
import AwsTransportClient from './clients/aws-transport.client';
import { Sns2sqsClientStrategy } from './strategies/sqs2sns-client.strategy';

@Module({
  imports: [
    // GOAL -> BornfightTransportModule.register(config),
  ],
  providers: [Sns2sqsClientStrategy, AwsTransportClient],
  exports: [AwsTransportClient],
})
export class TransportModule {}
