import express from 'express';
import { getMenu, createDish, getDishById, updateDishById, deleteDishById } from '../../controlers/menuController.js';
const menuRoutes = express.Router();


menuRoutes.get("/", getMenu);
menuRoutes.post("/newDish", createDish);
menuRoutes.get("/:id", getDishById);
menuRoutes.patch("/:id", updateDishById);
menuRoutes.delete("/:id", deleteDishById);

export default menuRoutes;