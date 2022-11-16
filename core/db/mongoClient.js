const mongodb = require('mongodb');
require('custom-env').env();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const databaseName = process.env.DBNAME;

const mongoURI = `mongodb+srv://${username}:${password}@cluster0.l515c.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const client = new mongodb.MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoClientPromise = client.connect();

module.exports = mongoClientPromise;
