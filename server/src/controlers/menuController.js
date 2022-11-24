import { contentfulMenu, saveItem, saveItemWithImg, dishByMenu, updateItem, updateItemWithImg, contentfullDelete } from "../utils/contentfulProvide.js";


const getMenu = (_, res) => {
  try {
    contentfulMenu(res);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const createDish = (req, res) => {
  try {
    if (req.body.name && req.body.price && req.body.currency && req.body.category) {
      req.files ? saveItemWithImg(req, res) : saveItem(req, res);
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
