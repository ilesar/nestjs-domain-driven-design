export default () => ({
  queueUrl: process.env.SQS_RESPONSE_QUEUE,
  waitTimeSeconds: 1,
  attributeNames: ['All'],
});
