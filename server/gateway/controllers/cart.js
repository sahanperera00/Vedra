import axios from "axios";
const cartAPI = process.env.CART_URI + "/orders";

export const getOrders = async (req, res) => {
  axios
    .get(cartAPI)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getOrderbyId = async (req, res) => {
  const { id } = req.params;
  axios
    .get(`${cartAPI}/${id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getOrderbyUserEmail = async (req, res) => {
  const { email } = req.params;
  axios
    .get(`${cartAPI}/email/${email}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const createOrder = async (req, res) => {
  const order = req.body;
  axios
    .post(cartAPI, order)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      res.status(409).json({ message: error.message });
    });
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  axios
    .delete(`${cartAPI}/${id}`)
    .then((response) => {
      res.status(200).json({ message: "Order removed successfully" });
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const addItemToCart = async (req, res) => {
  const { id } = req.params;
  const item = req.body;
  axios
    .post(`${cartAPI}/${id}/addItem`, item)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      res.status(409).json({ message: error.message });
    });
};

export const removeItemFromCart = async (req, res) => {
  const { id } = req.params;
  const item = req.body;
  axios
    .post(`${cartAPI}/${id}/removeItem`, item)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((error) => {
      res.status(409).json({ message: error.message });
    });
};

export const searchOrder = async (req, res) => {
  const { email, status, itemID } = req.params;
  axios
    .get(`${cartAPI}/${email}/${status}/${itemID}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const findOrderbyEmailStatus = async (req, res) => {
  const { email, status } = req.params;
  axios
    .get(`${cartAPI}/${email}/${status}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const getCartOrders = async (req, res) => {
  axios
    .get(`${cartAPI}/status/cart/cart/cart`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const updateOrderStatus = async (req, res) => {
  const { id, status } = req.body;
  axios
    .patch(`${cartAPI}/updateStatus`, { id, status })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};

export const updateItemQuantity = async (req, res) => {
  const orderId = req.params.orderId;
  const itemId = req.params.itemId;
  const quantity = req.body.quantity;

  axios
    .put(`${cartAPI}/${orderId}/${itemId}`, { quantity })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
    });
};
