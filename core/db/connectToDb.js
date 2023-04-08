import mongoose from 'mongoose';
require('custom-env').env();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const databaseName = process.env.MONGO_DBNAME_V2;

const mongoURI = `mongodb+srv://${username}:${password}@cluster0.haay1m9.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

if (!mongoURI) {
  throw new Error(
    'Please define the mongoURI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.set('strictQuery', false);
    cached.promise = mongoose.connect(mongoURI, opts).then((mongoose) => {
      mongoose.set('strictQuery', false);
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDb;
