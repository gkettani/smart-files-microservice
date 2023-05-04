import fs from 'fs';
import mongodb from 'mongodb';
import mongoose from 'mongoose';

const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

/**
 *  Uploads a file to MongoDB
 * @param {*} filepath 
 * @param {*} filename 
 * @returns {Promise}- A promise that resolves when the upload is complete
 */
export async function uploadFile(filepath, filename) {
  // Connect to MongoDB
  const client = await mongodb.MongoClient.connect(MONGO_URI);
  const db = client.db();

  // Initialize a GridFS bucket object
  const bucket = new mongodb.GridFSBucket(db);

  // Open a read stream for the file you want to upload
  const stream = fs.createReadStream(filepath);

  // Create a new GridFS file in the bucket
  const uploadStream = bucket.openUploadStream(filename);

  // Pipe the read stream into the GridFS upload stream
  stream.pipe(uploadStream);

  return new Promise((resolve, reject) => {
    uploadStream.on('finish', resolve);
    uploadStream.on('error', reject);
  });
}

export async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
