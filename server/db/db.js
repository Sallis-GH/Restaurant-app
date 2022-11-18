const { MongoClient } = require('mongodb');
​
const url = 'mongodb+srv://admsFamilySalt:4xxl9yYXvhnEAI45@restaurant-app-db.d4eqtgh.mongodb.net/test';
const dbName = 'Restaurant-app-DB';
​
const connect = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);
  const collection = db.collection('');
  db.on('close', () => {
    console.log('connection closed');
  });
  db.on('reconnect', () => {
    console.log('reconnected');
  });
  return { collection, client };
};
