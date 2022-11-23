import contentful from 'contentful-management';
import * as dotenv from 'dotenv';
dotenv.config();

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  environment: 'master',
  accessToken: process.env.CONTENTFUL_TOKEN,
})

const saveItem = (req, res) => {
  client.getSpace(process.env.CONTENTFUL_SPACE)
    .then(space => space.getEnvironment('master'))
    .then(environment => environment.createEntry('products', {
      fields: {
        name: { 'en-US': req.body.name },
        description: { 'en-US': req.body.description },
        price: { 'en-US': +req.body.price },
        currency: { 'en-US': req.body.currency },
        category: { 'en-US': req.body.category },
        ingredients: { 'en-US': JSON.parse(req.body.ingredients) }
      }
    }))
    .then(async entry => {
      await entry.publish();
      return await res.status(201).send();
    })
};

const saveItemWithImg = (req, res) => {

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
          return await res.status(201).send();
        })
    })
};

export { saveItem, saveItemWithImg }