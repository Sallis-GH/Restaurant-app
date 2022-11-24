import contentful from 'contentful-management';
import * as dotenv from 'dotenv';
dotenv.config();

let imageID = '';

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  environment: 'master',
  accessToken: process.env.CONTENTFUL_TOKEN,
})

const saveImage = async file => {
  return await client.getSpace(process.env.CONTENTFUL_SPACE)
    .then(space => space.getEnvironment('master'))
    .then(environment => environment.createAssetFromFiles({
      fields: {
        title: { 'en-US': file.name },
        description: { 'en-US': '' },
        file: {
          'en-US': {
            contentType: file.mimetype,
            fileName: file.name,
            file: file.data
          }
        }
      }
    }))
    .then(asset => asset.processForAllLocales())
    .then(asset => {
      asset.publish();
      return imageID = asset.sys.id;
    });
}

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
  saveImage(req.files.image)
    .then(() => {
      client.getSpace(process.env.CONTENTFUL_SPACE)
        .then(space => space.getEnvironment('master'))
        .then(environment => {
          return environment.createEntry('products', {
            fields: {
              name: { 'en-US': req.body.name },
              description: { 'en-US': req.body.description },
              image: {
                'en-US': {
                  "sys": {
                    "type": "Link",
                    "linkType": "Asset",
                    "id": imageID
                  }
                }
              },
              price: { 'en-US': +req.body.price },
              currency: { 'en-US': req.body.currency },
              category: { 'en-US': req.body.category },
              ingredients: { 'en-US': JSON.parse(req.body.ingredients) }
            }
          })
        })
        .then(async entry => {
          await entry.publish();
          return await res.status(201).send();
        });
    });
};

const updateItem = (req, res) => {
  client.getSpace(process.env.CONTENTFUL_SPACE)
    .then(space => space.getEnvironment('master'))
    .then((environment) => environment.getEntry('products'))
    .then((entry) => {
      entry.fields.name['en-US'] = req.body.name;
      entry.fields.description['en-US'] = req.body.description;
      entry.fields.price['en-US'] = +req.body.price;
      entry.fields.currency['en-US'] = req.body.currency;
      entry.fields.category['en-US'] = req.body.category;
      entry.fields.ingredients['en-US'] = req.body.ingredients;
      entry.update()
    })
    .then(() => res.status(204).send())
};

const updateItemWithImg = (req, res) => {
  saveImage(req.files.image)
    .then(() => {
      client.getSpace(process.env.CONTENTFUL_SPACE)
        .then(space => space.getEnvironment('master'))
        .then((environment) => environment.getEntry('products'))
        .then((entry) => {
          entry.fields.name['en-US'] = req.body.name;
          entry.fields.description['en-US'] = req.body.description;
          entry.fields.image['en-US']['sys'] = {
            "type": "Link",
            "linkType": "Asset",
            "id": asset.sys.id
          }
          entry.fields.price['en-US'] = +req.body.price;
          entry.fields.currency['en-US'] = req.body.currency;
          entry.fields.category['en-US'] = req.body.category;
          entry.fields.ingredients['en-US'] = req.body.ingredients;
          entry.update()
        })
        .then(() => res.status(204).send())
    });
};

export { saveItem, saveItemWithImg, updateItem, updateItemWithImg }