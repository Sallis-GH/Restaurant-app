import { connect, close } from "../../db/db.js";
import { User } from "../../db/models.js";
import { v4 as uuid } from "uuid";

const getUsers = async (_, res) => {
  try {
    const allUsers = await connect(() => User.find({}));
    console.log(allUsers);
    close();
    res.json(allUsers);
} catch ({message}) {
  close();
  res.json({message});
}
};

const createUser = async ({ body: { firstName, lastName } }, res) => {
  try {
    const crearedUser = await connect(() => User.create({
      id: uuid(),
      firstName,
      lastName,
    }));
    close();
    res.json(crearedUser);
  } catch ({_message}) {
    close();
    res
    .status(400)
    .json({ message: _message });
  }
};

const getUserById = async ({ params: { id } }, res) => {
  console.log(id, "LOGING ID");
  try {
    const userById = await connect(async () => {
      const findUserById = await User.findOne({ id });
      if (!findUserById) throw Error('User not found')
      console.log(findUserById, "findUserById");
      return findUserById;
    });
    close();
    res.json(userById);
  } catch ({message}) {
    close();
    res
    .status(404)
    .json({message});
  }
};

const updateUserById = async (
  { body: { firstName, lastName }, params: { id } },
  res
) => {
  try {
    console.log(firstName, lastName, " LOGING THE BODY");
    const updatedUser = await connect(async () => {
      const userToupdate = await User.findOne({ id });
      if (!userToupdate) throw Error('User not found')
      console.log(userToupdate, "USER FOUND BY ID");
      firstName ? (userToupdate.firstName = firstName) : "";
      lastName ? (userToupdate.lastName = lastName) : "";
      console.log(userToupdate, "AFTRE MANIPULATING");
      await userToupdate.save();
      return userToupdate;
    });
    close();
    res.json(updatedUser);
  } catch ({message}) {
    close();
    res
    .status(404)
    .json({message});
  }
};

const deleteUserById = async ({ params: { id } }, res) => {
  try {
    console.log(id , " TO DELETE");
    const resault = await connect(async () => {
      const {deletedCount} = await User.deleteOne({ id });
      if (!deletedCount) throw Error('User not found')
    });
    close();
    res.json({ message: 'User has been removed' });
  } catch ({message}) {
    close();
    res
    .status(404)
    .json({message});
  }
};


export default { getUsers, createUser, getUserById, updateUserById, deleteUserById };
