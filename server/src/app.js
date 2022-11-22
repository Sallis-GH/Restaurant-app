import express from 'express';
import menuRoutes from './api/menuRoutes/menuRoutes.js'
import ordersRoutes from './api/ordersRoutes/ordersRoutes.js'
import usersRoutes from './api/usersRoutes/usersRoutes.js'

const router = express.Router();

router.use("/menu", menuRoutes);
router.use("/orders", ordersRoutes);
router.use("/users", usersRoutes);

export default router;