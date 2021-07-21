import { Sns2sqsMessageType } from '../enums/sns2sqs-message.type';

export default interface NotificationInterface {
  pattern: string;
  id: string;
  data: any;
  topic: string;
  type: Sns2sqsMessageType;
  returnTopic: string;
  isFifo?: boolean;
}
