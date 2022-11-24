import express from 'express';
import orderControler from '../../controlers/orderControler.js'
const ordersRoutes = express.Router();

ordersRoutes.get("/", orderControler.getOrders);
ordersRoutes.post("/neworder", orderControler.createOrder);
ordersRoutes.get("/:id", orderControler.getOrderById);
ordersRoutes.patch("/:id", orderControler.updateOrderById);
ordersRoutes.delete("/:id", orderControler.deleteOrderById);

export default ordersRoutes