const mongodb = require('mongodb');
require('custom-env').env();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const databaseName = process.env.MONGO_DBNAME;

const mongoURI = `mongodb+srv://${username}:${password}@cluster0.haay1m9.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const client = new mongodb.MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoClientPromise = client.connect();

module.exports = mongoClientPromise;
