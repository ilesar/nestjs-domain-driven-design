import NotificationInterface from '../interfaces/notification.interface';

export class NotificationBuilder {
  constructor(private readonly options) {}

  createNotification(config: NotificationInterface) {
    return {
      Message: this.createMessageBody(config),
      TopicArn: config.topic,
    };
  }

  createFifoNotification(config: NotificationInterface) {
    return {
      Message: this.createMessageBody(config),
      MessageGroupId: this.options.MessageGroupId,
      TopicArn: config.topic,
      MessageDeduplicationId: config.id,
    };
  }

  private createMessageBody(config: NotificationInterface) {
    return JSON.stringify({
      id: config.id,
      type: config.type,
      pattern: config.pattern,
      data: config.data,
      returnTopic: config.returnTopic,
    });
  }
}
