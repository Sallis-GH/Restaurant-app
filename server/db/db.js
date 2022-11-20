import mongoose from 'mongoose';

const url = 'mongodb+srv://admsFamilySalt:4xxl9yYXvhnEAI45@restaurant-app-db.d4eqtgh.mongodb.net/test';
// const dbName = 'Restaurant-app-DB';

const connect = async () => {
   mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Open connection');
  return
};

const close = async () => {
  mongoose.connection.close(
    () => console.log("info:", "closing conneciton")); 
  return
}

export {connect, close}

// const dataHandeler = async (cb) => {
//   const con = await mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }, () => console.log("Open connection"));
//   console.log(con);
//   mongoose.Promise = global.Promise;
//   const result = cb();
//   await mongoose.connection.close(
//     () => console.log("info:", "closing conneciton"));
//     return
// };