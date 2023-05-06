const env = process.env.NODE_ENV || 'development';

const { PORT, UPLOADS_PATH, MONGO_URI, MONGO_HOST, MONGO_PORT, DB_NAME, RABBITMQ_URI, RABBITMQ_HOST, RABBITMQ_QUEUE, RABBITMQ_PORT } = process.env;


const development = {
  PORT: PORT || 3000,
  UPLOADS_PATH: UPLOADS_PATH || 'uploads',
  MONGO_URI,
  RABBITMQ_URI,
  RABBITMQ_QUEUE: RABBITMQ_QUEUE || 'files',
};

const production = {
  PORT,
  UPLOADS_PATH,
  MONGO_URI: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`,
  RABBITMQ_URI: `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
  RABBITMQ_QUEUE,
};

const config = {
  development,
  production,
};

console.log(config[env])

export default config[env];
