import amqp from 'amqplib';

const QUEUE_NAME = process.env.RABBITMQ_QUEUE;
const QUEUE_URI = process.env.RABBITMQ_URI;

async function connect() {
  try {
    const connection = await amqp.connect(QUEUE_URI);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, {
      durable: false
    });
    return channel;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function QueueService() {
  const channel = await connect();
  if (!channel) return null;

  return {
    sendToQueue: async (message) => {
      try {
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
        console.log(`Message sent to ${QUEUE_NAME}`);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

const queue = await QueueService();
export default queue;
