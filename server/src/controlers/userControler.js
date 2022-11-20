import { connect, close } from "../../db/db.js";
import { User } from "../../db/models.js";
import { v4 as uuid } from "uuid";
import mongoose from "mongoose";
const url =
  "mongodb+srv://admsFamilySalt:4xxl9yYXvhnEAI45@restaurant-app-db.d4eqtgh.mongodb.net/test";

// const getUsers = async (req, res) => {
//   try {
//     mongoose.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//     const users = await User.find();
//     mongoose.connection.close(
//         () => console.log("info:", "closing conneciton"));
//     res.json(users);
//   } catch (error) {
//     console.log(error);
//     close();
//     res.send({ message: error._message });
//   }
// };
const getUsers = async (req, res) => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    User.find()
      .then((users) => {
        console.log(users);
        mongoose.connection.close(() =>
          console.log("info:", "closing conneciton")
        );
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
        mongoose.connection.close(() =>
          console.log("error:", "closing conneciton")
        );
      });
  } catch (error) {
    console.log(error);
    close();
    res.send({ message: error._message });
  }
};

// Recipe.find({ title: "Lasagna" })
//   .then((doc) => {
//     console.log(doc);
//     mongoose.connection.close(() => console.log("info:", "closing conneciton"));
//   })
//   .catch((err) => {
//     console.log(err);
//     mongoose.connection.close(() =>
//       console.log("error:", "closing conneciton")
//     );
//   });

const createUser = async ({ body: { firstName, lastName } }, res) => {
  try {
    connect();
    const crearedUser = await User.create({
      id: uuid(),
      firstName,
      lastName,
    });
    close();
    res.json(crearedUser);
  } catch (error) {
    close();
    res.send({ message: error._message });
  }
};

const getUserById = async ({ params: { id } }, res) => {
  console.log(id, "LOGING ID");
  try {
    connect();
    const findUserById = await User.findOne({ id });
    console.log(findUserById, "findUserById");
    close();
    res.json(findUserById);
  } catch (error) {
    console.log(error, "LOGING THE ERORO");
    close();
    res.json({ error });
  }
};

const updateUserById = async (
  { body: { firstName, lastName }, params: { id } },
  res
) => {
  try {
    console.log(firstName, lastName, " LOGING THE BODY");
    connect();
    const userToupdate = await User.findOne({ id });
    console.log(userToupdate, "USER FOUND BY ID");
    firstName ? (userToupdate.firstName = firstName) : "";
    lastName ? (userToupdate.lastName = lastName) : "";
    console.log(userToupdate, "AFTRE MANIPULATING");
    await userToupdate.save();
    close();
    res.json(userToupdate);
  } catch (error) {
    close();
    res.send({ message: error._message });
  }
};

const deleteUserById = async ({ params: { id } }, res) => {
  try {
    console.log(id , " TO DELETE");
    connect();
    const deletedUser = await User.deleteOne({ id });
    close();
    res.json(deletedUser);
  } catch (error) {
    close();
    res.send({ message: error._message });
  }
};


export default { getUsers, createUser, getUserById, updateUserById, deleteUserById };
