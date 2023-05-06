import amqp from 'amqplib';
import config from '../config/config.js';

const { RABBITMQ_URI, RABBITMQ_QUEUE } = config;

async function connect() {
  try {
    const connection = await amqp.connect(RABBITMQ_URI);
    const channel = await connection.createChannel();
    await channel.assertQueue(RABBITMQ_QUEUE, {
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
        channel.sendToQueue(RABBITMQ_QUEUE, Buffer.from(message));
        console.log(`Message sent to ${RABBITMQ_QUEUE}`);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

const queue = await QueueService();
export default queue;
