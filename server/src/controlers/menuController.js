import { connect, close } from "../../db/db.js";
import contentful from 'contentful-management';
import { Menu } from "../../db/models.js";

const client = contentful.createClient({
  space: '0658u1xd0vki',
  environment: 'master',
  accessToken: 'CFPAT-sCrJdSzlCnRkvR9soZIkr4B26NLwoVIUOcWgJs-pHDc',
})

const getMenu = async (_, res) => {
  try {

    client.getSpace('0658u1xd0vki')
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.getEntries())
      .then((products) => res.status(200).json(products))
    // const menu = await connect(() => Menu.find({}));
    // close();
    // res.status(200).json(menu);
  } catch ({ message }) {
    // close();
    res.status(404).json({ message });
  }
};

//todo ----------------------------------------------------------------
const createDish = async (req, res) => {

  try {
    client.getSpace('0658u1xd0vki')
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.createAssetFromFiles({
        fields: {
          title: {
            'en-US': req.files.image.name
          },
          description: {
            'en-US': 'Asset description'
          },
          file: {
            'en-US': {
              contentType: req.files.image.mimetype,
              fileName: req.files.image.name,
              file: req.files.image.data
            }
          }
        }
      }))
      .then((asset) => {
        return asset.processForAllLocales()
      })
      .then((asset) => {
        asset.publish();

        client.getSpace('0658u1xd0vki')
          .then(space => space.getEnvironment('master'))
          .then(environment => environment.getAsset(asset.sys.id))
          .then(resp => {

            // console.log(resp.fields.file['en-US'].url, 'I AM THE IMAGE');
            console.log(resp.fields.file, 'I AM THE IMAGE');

            client.getSpace('0658u1xd0vki')
              .then((space) => space.getEnvironment('master'))
              .then((environment) => environment.createEntry('pizza', {
                fields: {
                  name: {
                    'en-US': req.body.name,
                  },
                  description: {
                    'en-US': req.body.description,
                  },

                  image: {
                    'en-GB': {
                      contentType: 'image/jpeg',
                      fileName: 'test.jpg',
                      upload: resp.fields.file['en-US'].url
                    }
                  },
                  price: { 'en-US': +req.body.price },
                  currency: { 'en-US': req.body.currency }
                }
              }))
              .then((entry) => entry.publish())
          })
      })
      .catch(console.error)
    res.status(200).send();
    //todo----------------------------------------------------------------
  } catch ({ _message }) {
    res
      .status(400)
      .json({ message: _message });
  }
};

const getDishById = async ({ params: { id } }, res) => {
  try {

    client.getSpace('0658u1xd0vki')
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.getEntry(id))
      .then((entry) => res.status(200).json(entry));
    // const dishById = await connect(async () => {
    //   const findDishById = await Menu.findOne({ id });
    //   if (!findDishById) throw Error('Dish not found');
    //   return findOrderById
    // });
    // close();
    // res.status(200).json(dishById);
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
