import axios from "axios";
const itemAPI = process.env.ITEM_URI + "/items";

export const getItems = async (req, res) => {
  axios
    .get(itemAPI)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getItembyId = async (req, res) => {
  const { id } = req.params;
  axios
    .get(`${itemAPI}/${id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const createItem = async (req, res) => {
  const item = req.body;
  axios
    .post(itemAPI, item)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      res.status(409).json({ message: error.message });
    });
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const item = req.body;
  axios
    .patch(`${itemAPI}/${id}`, item)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  axios
    .delete(`${itemAPI}/${id}`)
    .then((response) => {
      res.status(200).json({ message: "Item deleted successfully" });
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getItemsbyCategory = async (req, res) => {
  const { category } = req.params;
  axios
    .get(`${itemAPI}/category/${category}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getItemsbySeller = async (req, res) => {
  const { sellerId } = req.params;
  axios
    .get(`${itemAPI}/seller/${sellerId}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const addReview = async (req, res) => {
  const review = req.body;
  const { id } = req.params;
  axios
    .post(`${itemAPI}/review/${id}`, review)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      res.status(409).json({ message: error.message });
    });
};
