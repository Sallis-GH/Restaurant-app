import express from 'express';
import userControler from '../../controlers/userControler.js'
const usersRoutes = express.Router();

usersRoutes.get("/", userControler.getUsers);
usersRoutes.post("/newuser", userControler.createUser);
usersRoutes.get("/:id", userControler.getUserById);
usersRoutes.patch("/:id", userControler.updateUserById);
usersRoutes.delete("/:id", userControler.deleteUserById);

export default usersRoutes