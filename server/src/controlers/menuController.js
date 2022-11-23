import contentful from 'contentful-management';
import * as dotenv from 'dotenv';
dotenv.config();

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  environment: 'master',
  accessToken: process.env.CONTENTFUL_TOKEN,
})

const getMenu = async (_, res) => {
  try {

    client.getSpace(process.env.CONTENTFUL_SPACE)
      .then(space => space.getEnvironment('master'))
      .then(environment => environment.getEntries())
      .then(products => res.status(200).json(products))
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const createDish = async (req, res) => {
  try {

    // todo
    // correct file from frontend
    // check validation for name  price currency category REQUIRED


    client.getSpace(process.env.CONTENTFUL_SPACE)
      .then(space => space.getEnvironment('master'))
      .then(environment => environment.createAssetFromFiles({
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
      .then(asset => {
        return asset.processForAllLocales()
      })
      .then(asset => {
        asset.publish();

        client.getSpace(process.env.CONTENTFUL_SPACE)
          .then(space => space.getEnvironment('master'))
          .then(environment => environment.createEntry('products', {
            fields: {
              name: {
                'en-US': req.body.name,
              },
              description: {
                'en-US': req.body.description,
              },

              image: {
                'en-US': {
                  "sys": {
                    "type": "Link",
                    "linkType": "Asset",
                    "id": asset.sys.id
                  }
                }
              },

              price: { 'en-US': +req.body.price },
              currency: { 'en-US': req.body.currency },
              category: { 'en-US': req.body.category },
              ingredients: { 'en-US': JSON.parse(req.body.ingredients) }
            }
          }))
          .then(async entry => {
            await entry.publish();
            await res.status(200).send();
          })
      })
  } catch ({ _message }) {
    res
      .status(400)
      .json({ message: _message });
  }
};

const getDishById = async ({ params: { id } }, res) => {
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

const deleteDishById = async ({ params: { id } }, res) => {
  console.log(id, "DELET");
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
