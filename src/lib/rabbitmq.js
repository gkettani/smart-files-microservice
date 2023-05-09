import amqp from 'amqplib';
import config from '../config/config.js';

const { RABBITMQ_URI, FILE_QUEUE, SYNTHESES_QUEUE } = config;

async function connect() {
  try {
    const connection = await amqp.connect(RABBITMQ_URI);
    const channel = await connection.createChannel();
    await channel.assertQueue(FILE_QUEUE, {
      durable: false
    });
    await channel.assertQueue(SYNTHESES_QUEUE, {
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
    sendToQueue: async (queue, message) => {
      try {
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Message sent to ${queue}`);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

const queue = await QueueService();
export default queue;
