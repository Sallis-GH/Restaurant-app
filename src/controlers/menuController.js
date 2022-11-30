import { saveItem, saveItemWithImg, dishByMenu, updateItem, updateItemWithImg, contentfullDelete } from "../utils/contentfulProvide.js";


import contentful from 'contentful'

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  environment: 'master',
  accessToken: process.env.CONTENTFUL_PUBLISH_KEY
})

const getMenu = (_, res) => {
  try {
    client.getEntries()
      .then((response) => res.send(response.items))
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const createDish = (req, res) => {
  const body = req.body.body;
  const parsedBody = JSON.parse(body);
  const { name, price, currency, description, category, ingredients } = parsedBody;
  try {
    if (name && price && currency && category) {
      req.files ? saveItemWithImg(parsedBody, req.files, res) : saveItem(parsedBody, res);
    };
  } catch ({ _message }) {
    res.status(400).json({ message: _message });
  }
};

const getDishById = ({ params: { id } }, res) => {
  try {
    dishByMenu(id, res);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const updateDishById = (req, res) => {
  try {
    if (req.body.name && req.body.price && req.body.currency && req.body.category) {
      req.files ? updateItemWithImg(req, res) : updateItem(req, res);
    };
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const deleteDishById = ({ params: { id } }, res) => {
  try {
    contentfullDelete(id, res);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

export { createDish, getMenu, getDishById, updateDishById, deleteDishById };
