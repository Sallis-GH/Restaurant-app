import express from 'express';
import { getMenu, createDish, getDishById, deleteDishById } from '../../controlers/menuController.js';
const menuRoutes = express.Router();


menuRoutes.get("/", getMenu);
menuRoutes.post("/newDish", createDish);
menuRoutes.get("/:id", getDishById);
// menuRoutes.patch("/:id", menuController.updateOrderById);
menuRoutes.delete("/:id", deleteDishById);

export default menuRoutes;