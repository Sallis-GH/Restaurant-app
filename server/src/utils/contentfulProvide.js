import contentful from 'contentful-management';
import * as dotenv from 'dotenv';
dotenv.config();


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
      return asset.sys.id;
    });
}

const saveItem = (req, res, imageID) => {
  return client.getSpace(process.env.CONTENTFUL_SPACE)
    .then(space => space.getEnvironment('master'))
    .then(environment => environment.createEntry('products', {
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
    }))
    .then(async entry => {
      await entry.publish();
      await res.status(201).send();
    })
};

const saveItemWithImg = (req, res) => {
  saveImage(req.files.image)
    .then((imageID) => saveItem(req, res, imageID));
};

const dishByMenu = (id, res) => {
  client.getSpace(process.env.CONTENTFUL_SPACE)
    .then(space => space.getEnvironment('master'))
    .then(environment => environment.getEntry(id))
    .then(entry => res.status(200).json(entry));
};

const updateItem = (req, res, imageID) => {
  client.getSpace(process.env.CONTENTFUL_SPACE)
    .then(space => space.getEnvironment('master'))
    .then((environment) => environment.getEntry(req.params.id))
    .then((entry) => {
      entry.fields.name['en-US'] = req.body.name;
      entry.fields.description['en-US'] = req.body.description;
      if (entry.fields.image['en-US']) {
        entry.fields.image['en-US'].sys = {
          "type": "Link",
          "linkType": "Asset",
          "id": imageID
        }
      } else {
        entry.fields.image['en-US'] = {
          "sys": {
            "type": "Link",
            "linkType": "Asset",
            "id": imageID
          }
        }
      }
      entry.fields.price['en-US'] = +req.body.price;
      entry.fields.currency['en-US'] = req.body.currency;
      entry.fields.category['en-US'] = req.body.category;
      entry.fields.ingredients['en-US'] = JSON.parse(req.body.ingredients);
      entry.update();
      entry.publish();
    })
    .then(() => res.status(204).send())
};

const updateItemWithImg = (req, res) => {
  saveImage(req.files.image)
    .then((imageID) => {
      updateItem(req, res, imageID)
    });
};

const deleteAssert = (id) => {
  client.getSpace(process.env.CONTENTFUL_SPACE)
    .then(space => space.getEnvironment('master'))
    .then(environment => environment.getAsset(id))
    .then(async asset => {
      await asset.unpublish()
      await asset.delete();
    })
};

const contentfullDelete = (id, res) => {
  client.getSpace(process.env.CONTENTFUL_SPACE)
    .then(space => space.getEnvironment('master'))
    .then(environment => environment.getEntry(id))
    .then(async entry => {
      await entry.unpublish();
      await entry.delete();
      return await deleteAssert(entry.fields.image['en-US'].sys.id);
    })
    .then(() => res.status(204).send('Successfully deleted'));
};

export { saveItem, saveItemWithImg, dishByMenu, updateItem, updateItemWithImg, contentfullDelete }