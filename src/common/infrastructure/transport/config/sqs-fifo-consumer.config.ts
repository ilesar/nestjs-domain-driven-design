export default () => ({
  queueUrl: process.env.SQS_RESPONSE_QUEUE + '.fifo',
  waitTimeSeconds: 1,
  attributeNames: ['All'],
});
