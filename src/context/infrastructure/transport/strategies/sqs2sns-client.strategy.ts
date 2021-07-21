import {
  ClientProxy,
  CustomTransportStrategy,
  ReadPacket,
  WritePacket,
} from '@nestjs/microservices';
import Sns2sqsClientManager from '../managers/sns2sqs-client.manager';
import { Sns2sqsMessageType } from '../enums/sns2sqs-message.type';

export class Sns2sqsClientStrategy
  extends ClientProxy
  implements CustomTransportStrategy
{
  private readonly manager: Sns2sqsClientManager;

  constructor() {
    super();
    this.manager = new Sns2sqsClientManager();
  }

  close(): any {
    this.manager.disconnect();
  }

  connect(): Promise<any> {
    return Promise.resolve(this.manager.connect());
  }

  protected dispatchEvent<T = any>(packet: ReadPacket): Promise<T> {
    const requestId = Math.round(Math.random() * 1000000).toString();

    this.manager.publishNotification({
      id: requestId,
      pattern: packet.pattern,
      data: packet.data.payload,
      topic: packet.data.topic,
      type: Sns2sqsMessageType.Event,
      returnTopic: packet.data.returnTopic,
      isFifo: packet.data.isFifo,
    });

    return Promise.resolve(undefined);
  }

  protected publish(
    packet: ReadPacket,
    callback: (packet: WritePacket) => void,
  ): () => void {
    const requestId = Math.round(Math.random() * 1000000).toString();

    this.manager.onResponse(requestId, (response) => {
      callback({ response: response.data });
    });

    this.manager.publishNotification({
      id: requestId,
      pattern: packet.pattern,
      data: packet.data.payload,
      topic: packet.data.topic,
      type: Sns2sqsMessageType.Request,
      returnTopic: packet.data.returnTopic,
      isFifo: packet.data.isFifo,
    });

    return () => console.log('published');
  }

  listen(callback: () => void): any {
    callback();
  }
}
