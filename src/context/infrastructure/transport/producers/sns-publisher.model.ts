import { SNS } from 'aws-sdk';
import { TransporterInterface } from '../interfaces/transporter.interface';
import { NotificationBuilder } from '../builders/notification.builder';
import NotificationInterface from '../interfaces/notification.interface';

export default class SnsPublisherModel implements TransporterInterface {
  private publisher: SNS;
  private readonly notificationBuilder: NotificationBuilder;

  constructor(private readonly options) {
    this.notificationBuilder = new NotificationBuilder(options);
  }

  connect(): void {
    this.publisher = new SNS({ region: 'eu-central-1' });
  }

  disconnect(): void {
    this.publisher = null;
  }

  publishNotification(config: NotificationInterface) {
    const notification = config.isFifo
      ? this.notificationBuilder.createFifoNotification(config)
      : this.notificationBuilder.createNotification(config);

    this.publish(notification);
  }

  private publish(notification) {
    this.publisher
      .publish(notification)
      .promise()
      .then((data) => {
        console.log(`Notification sent`);
        console.log('Notification ID is ' + data.MessageId);
      })
      .catch((err) => {
        console.error(err, err.stack);
      });
  }
}
