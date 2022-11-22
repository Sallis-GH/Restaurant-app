import mongoose from 'mongoose';

const url = 'mongodb+srv://admsFamilySalt:4xxl9yYXvhnEAI45@restaurant-app-db.d4eqtgh.mongodb.net/restaurant';

const connect = async (cb) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },);
  const resault = cb()
  console.log('Open connection');
  return resault
};

const close = async () => {
  mongoose.connection.close(
    () => console.log("info:", "closing conneciton"));
  return
}

export { connect, close }
