const env = process.env.NODE_ENV || 'development';

const { 
  PORT, 
  UPLOADS_PATH, 
  MONGO_URI, 
  MONGO_HOST, 
  MONGO_PORT, 
  DB_NAME, 
  RABBITMQ_URI, 
  RABBITMQ_HOST, 
  RABBITMQ_PORT,
  FILE_QUEUE,
  SYNTHESIS_QUEUE,
} = process.env;


const development = {
  PORT: PORT || 3000,
  UPLOADS_PATH: UPLOADS_PATH || 'uploads',
  MONGO_URI,
  RABBITMQ_URI,
  FILE_QUEUE: FILE_QUEUE || 'files',
  SYNTHESIS_QUEUE: SYNTHESIS_QUEUE || 'syntheses',
};

const production = {
  PORT,
  UPLOADS_PATH,
  MONGO_URI: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`,
  RABBITMQ_URI: `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
  FILE_QUEUE: FILE_QUEUE || 'files',
  SYNTHESIS_QUEUE: SYNTHESIS_QUEUE || 'syntheses',
};

const config = {
  development,
  production,
};

export default config[env];
