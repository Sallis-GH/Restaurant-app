import { connect, close } from "../../db/db.js";
import contentful from 'contentful';
// import contentful from 'contentful-management';
import { Img, Menu } from "../../db/models.js";

const client = contentful.createClient({
  space: '0658u1xd0vki',
  environment: 'master',
  accessToken: 'fRxVCdOpBzexXrf1H_yZ-uISKTvx382TEsex9BUz-Hs'
})

const getMenu = async (_, res) => {
  try {
    client.getEntries()
      .then(response => response.items.map(item => item.fields))
      .then(products => res.status(200).json(products))
    // const menu = await connect(() => Menu.find({}));
    // close();
    // res.status(200).json(menu);
  } catch ({ message }) {
    // close();
    res.status(404).json({ message });
  }
};

//todo ----------------------------------------------------------------
// const createDish = async ({ body: { name, description, price, currency } }, res) => {
const createDish = async (req, res) => {
  // console.log(req.body, 'BOOOODDDY');
  // console.log(req.files, 'yah');
  // console.log(req.files.file.data, 'yah');

  // await connect(() => Img.create({ "Img": { data: req.files.file.data, contentType: req.files.file.mimetype } }));
  // await connect(() => Img.create({ id: 1, file: req.files.file }));
  // close();
  // await connect(() => Menu.create({
  //   "name": req.body.name,
  //   "description": req.body.value,
  //   "price": +req.body.price,
  //   "currency": req.body.currency,
  // }));
  // close();






  // client.getSpace('0658u1xd0vki')
  //   .then((space) => space.getEnvironment('master'))
  //   .then((environment) => environment.createAsset({
  //     fields: {
  //       title: {
  //         'en-US': 'Playsam Streamliner'
  //       },
  //       description: {
  //         'en-US': 'Streamliner description'
  //       },
  //       file: {
  //         'en-US': {
  //           contentType: 'image/png',
  //           fileName: 'someImg',
  //           upload: 'https://i.pinimg.com/originals/0a/1f/82/0a1f820e29719c7b67e9d5aa44241155.png'
  //         }
  //       }
  //     }
  //   }))
  //   .then((asset) => asset.processForAllLocales())
  //   .then((asset) => console.log(asset))
  //   .catch(console.error)






  // res.json(req.files)
  try {
    const image = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype };


    // const crearedOrder = await connect(() => Order.create({
    //   id: uuid(),
    //   address,
    //   orders,
    // }));
    // close();
    // res.json(crearedOrder);

    // res.status(201).send('hola yeah')
  } catch ({ _message }) {
    //   close();
    //   res
    //     .status(400)
    //     .json({ message: _message });
  }
};

const getDishById = async ({ params: { id } }, res) => {
  try {
    const dishById = await connect(async () => {
      const findDishById = await Menu.findOne({ id });
      if (!findDishById) throw Error('Dish not found');
      return findOrderById
    });
    close();
    res.status(200).json(dishById);
  } catch ({ message }) {
    close();
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

const deleteDishById = async ({ params: { id } }, res) => {
  try {
    await connect(async () => await Menu.deleteOne({ id }));
    close();
    res.status(204).send();
  } catch ({ message }) {
    close();
    res.status(404).json({ message });
  }
};

export { createDish, getMenu, getDishById, deleteDishById };