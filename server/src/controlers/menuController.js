import { saveItem, saveItemWithImg } from "../utils/contentfulProvide.js";
import contentful from 'contentful-management';

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  environment: 'master',
  accessToken: process.env.CONTENTFUL_TOKEN,
})

const getMenu = (_, res) => {
  try {
    client.getSpace(process.env.CONTENTFUL_SPACE)
      .then(space => space.getEnvironment('master'))
      .then(environment => environment.getEntries())
      .then(products => res.status(200).json(products))
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const createDish = (req, res) => {
  try {
    if (req.body.name && req.body.price && req.body.currency && req.body.category) {
      req.file ? saveItemWithImg(req, res) : saveItem(req, res);
    };
  } catch ({ _message }) {
    res
      .status(400)
      .json({ message: _message });
  }
};

const getDishById = ({ params: { id } }, res) => {
  try {
    client.getSpace(process.env.CONTENTFUL_SPACE)
      .then(space => space.getEnvironment('master'))
      .then(environment => environment.getEntry(id))
      .then(entry => res.status(200).json(entry));
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

// const updateDishById = async (
//   { body: { address, orders }, params: { id } },
//   res
// ) => {
//   try {
//     console.log(address, orders, " LOGING THE BODY");
//     const updatedOrder = await connect(async () => {
//       const orderToUpdate = await Order.findOne({ id });
//       if (!orderToUpdate) throw Error('Order not found')
//       console.log(orderToUpdate, "FOUND BY ID");
//       address ? orderToUpdate.address = address : "";
//       orders ? orderToUpdate.orders = orders : "";
//       console.log(orderToUpdate, "AFTRE MANIPULATING");
//       await orderToUpdate.save();
//       return orderToUpdate;
//     });
//     close();
//     res.json(updatedOrder);
//   } catch ({ message }) {
//     close();
//     res
//       .status(404)
//       .json({ message });
//   }
// };

const deleteDishById = ({ params: { id } }, res) => {
  try {
    client.getSpace(process.env.CONTENTFUL_SPACE)
      .then(space => space.getEnvironment('master'))
      .then(environment => environment.getEntry(id))
      .then(async entry => {
        await entry.unpublish();
        await entry.delete();
      })
      .then(() => res.status(204).send('Successfully deleted'));
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

export { createDish, getMenu, getDishById, deleteDishById };
