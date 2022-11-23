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

//todo ----------------------------------------------------------------
const createDish = async (req, res) => {

  try {
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
          .then(environment => environment.getAsset(asset.sys.id))
          .then(resp => {

            // console.log(resp.fields.file['en-US'].url, 'I AM THE IMAGE');
            console.log(resp.fields.file, 'I AM THE IMAGE');

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

                  // todo
                  // image: {
                  //   'en-US': {
                  //     sys: {
                  //       type: 'image/jpeg',
                  //       Asset: resp.fields.file['en-US'].url,
                  //     }
                  //   }
                  // },

                  // image: {
                  //   'en-GB': {
                  //     contentType: 'image/jpeg',
                  //     fileName: 'test.jpg',
                  //     upload: resp.fields.file['en-US'].url
                  //   }
                  // },
                  price: { 'en-US': +req.body.price },
                  currency: { 'en-US': req.body.currency }
                }
              }))
              .then(async entry => {
                await entry.publish();
                await res.status(200).send();
              })
          })
      })
    //todo----------------------------------------------------------------
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
