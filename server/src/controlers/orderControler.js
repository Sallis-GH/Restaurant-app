import { connect, close } from "../../db/db.js";
import { Order } from "../../db/models.js";
import { v4 as uuid } from "uuid";


const getOrders = async (_, res) => {
  try {
    const allOrders = await connect(() => Order.find({}));
    console.log(allOrders, 'result');
    close();
    res.json(allOrders);
  } catch ({message}) {
    close();
    res.json({message});
  }
};

const createOrder = async ({ body: { address, orders } }, res) => {
  try {
  const crearedOrder = await connect(() => Order.create({
      id: uuid(),
      address,
      orders,
    }));
    close();
    res.json(crearedOrder);
  } catch ({_message}) {
    close();
    res
    .status(400)
    .json({ message: _message });
  }
};

const getOrderById = async ({ params: { id } }, res) => {
  console.log(id, "LOGING ID");
  try {
    const orderById = await connect(async () => {
      const findOrderById = await Order.findOne({ id });
      if (!findOrderById) throw Error('Order not found');
      console.log(findOrderById, "FIND OBJECT BY ID");
      return findOrderById
    });
    close();
    res.json(orderById);
  } catch ({message}) {
    close();
    res
    .status(404)
    .json({message});
  }
};

const updateOrderById = async (
  { body: { address, orders }, params: { id } },
  res
) => {
  try {
    console.log(address, orders, " LOGING THE BODY");
    const updatedOrder = await connect(async () => {
      const orderToUpdate = await Order.findOne({ id });
      if (!orderToUpdate) throw Error('Order not found')
      console.log(orderToUpdate, "FOUND BY ID");
      address ? orderToUpdate.address = address : "";
      orders ? orderToUpdate.orders = orders : "";
      console.log(orderToUpdate, "AFTRE MANIPULATING");
      await orderToUpdate.save();
      return orderToUpdate;
    });
    close();
    res.json(updatedOrder);
  } catch ({message}) {
    close();
    res
    .status(404)
    .json({message});
  }
};

const deleteOrderById = async ({ params: { id } }, res) => {
  try {
    console.log(id , " TO DELETE");
    const resault = await connect(async () => {
      const {deletedCount} = await Order.deleteOne({ id });
      if (!deletedCount) throw Error('Order not found')
    });
    close();
    res.json({ message: 'Order has been removed' });
  } catch ({message}) {
    close();
    res
    .status(404)
    .json({message});
  }
};

export default { getOrders, createOrder, getOrderById, updateOrderById, deleteOrderById };
