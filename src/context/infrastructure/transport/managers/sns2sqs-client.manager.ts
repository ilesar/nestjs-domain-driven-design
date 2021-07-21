import SqsConsumerModel from '../consumers/sqs-consumer.model';
import SnsPublisherModel from '../producers/sns-publisher.model';
import { EventEmitter } from 'events';
import consumerConfig from '../config/sqs-consumer.config';
import fifoConsumerConfig from '../config/sqs-fifo-consumer.config';
import publisherConfig from '../config/sns-publisher.config';
import NotificationInterface from '../interfaces/notification.interface';
import { ConsumerEvent } from '../enums/consumer.event';

export default class Sns2sqsClientManager extends EventEmitter {
  private readonly publisher: SnsPublisherModel;
  private readonly consumer: SqsConsumerModel;
  private readonly fifoConsumer: SqsConsumerModel;
  private eventBus: EventEmitter;

  constructor() {
    super();
    this.eventBus = new EventEmitter();
    this.consumer = new SqsConsumerModel(consumerConfig());
    this.fifoConsumer = new SqsConsumerModel(fifoConsumerConfig());
    this.publisher = new SnsPublisherModel(publisherConfig());
  }

  disconnect(): any {
    this.consumer.addListener(ConsumerEvent.Message, undefined);

    this.consumer.disconnect();
    this.fifoConsumer.disconnect();
    this.publisher.disconnect();
  }

  connect(): Promise<any> {
    this.consumer.connect();
    this.fifoConsumer.connect();
    this.publisher.connect();

    this.consumer.addListener(ConsumerEvent.Message, this.onMessage.bind(this));

    return Promise.resolve(this.publisher);
  }

  publishNotification(config: NotificationInterface) {
    this.publisher.publishNotification(config);
  }

  onResponse(id: string, callback: (response) => void) {
    this.addListener(id, (response) => {
      this.removeListener(id, () => undefined);

      callback(JSON.parse(response.Message));
    });
  }

  private onMessage(response) {
    const messageBody = JSON.parse(response.Message);

    this.emit(messageBody.id, response);
  }
}
