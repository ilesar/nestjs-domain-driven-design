import { Injectable, InternalServerErrorException } from '@nestjs/common';
import JsonInterface from '../interfaces/json.interface';
import { Sns2sqsClientStrategy } from '../strategies/sqs2sns-client.strategy';
import TransportClientInterface from '../interfaces/transport-client.interface';
import { Microservices } from '../microservices.enum';

@Injectable()
export default class AwsTransportClient implements TransportClientInterface {
  constructor(private readonly strategy: Sns2sqsClientStrategy) {}

  async connect() {
    await this.strategy.connect();
  }

  async sendRequest(service: string, action: string, data: any): Promise<any> {
    return new Promise((resolve) => {
      this.strategy
        .send<JsonInterface>(action, {
          payload: data,
          topic: service,
          returnTopic: Microservices.Application,
        })
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  async emitEvent(service: string, action: string, data: any): Promise<void> {
    await this.strategy.emit(action, {
      payload: data,
      topic: service,
    });
    return Promise.resolve(undefined);
  }

  async sendFifoRequest(
    service: string,
    action: string,
    data: any,
  ): Promise<any> {
    return new Promise((resolve) => {
      this.strategy
        .send<number>(action, {
          payload: data,
          topic: `${service}.fifo`,
          isFifo: true,
          returnTopic: Microservices.Application,
        })
        .subscribe((response) => {
          resolve(response);
        });
    });
  }

  async emitFifoEvent(
    service: string,
    action: string,
    data: any,
  ): Promise<void> {
    await this.strategy.emit(action, {
      payload: data,
      topic: `${service}.fifo`,
      isFifo: true,
    });
    return Promise.resolve(undefined);
  }
}
