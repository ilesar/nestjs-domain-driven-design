import { Consumer, ConsumerOptions } from 'sqs-consumer';
import { EventEmitter } from 'events';
import { TransporterInterface } from '../interfaces/transporter.interface';
import { ConsumerEvent } from '../enums/consumer.event';

export default class SqsConsumerModel
  extends EventEmitter
  implements TransporterInterface
{
  private consumer: Consumer;

  constructor(private readonly options: ConsumerOptions) {
    super();
    this.setupConsumer();
    this.setupConsumerEventListeners();
  }

  connect(): void {
    this.consumer.start();
  }

  disconnect(): void {
    this.consumer.stop();
    this.consumer = null;
  }

  private setupConsumer(): void {
    this.consumer = Consumer.create({
      ...this.options,
      handleMessage: async (message) => {
        this.handleMessage(message);
      },
      handleMessageBatch: async (messages) => {
        for (const message of messages) {
          this.handleMessage(message);
        }
      },
    });
  }

  private setupConsumerEventListeners(): void {
    this.consumer.on(ConsumerEvent.Error, this.handleError);
    this.consumer.on(ConsumerEvent.ProcessingError, this.handleError);
    this.consumer.on(ConsumerEvent.TimeoutError, this.handleError);
  }

  private handleError(error: Error) {
    console.error(error.message);
  }

  private handleMessage(message) {
    this.emit(ConsumerEvent.Message, JSON.parse(message.Body));
  }
}
