import Order from "../models/cart.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOrderbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOrderbyUserEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const order = await Order.find({ email: email });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const order = req.body;
  const newOrder = new Order(order);
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndRemove(id);
    res.status(200).json({ message: "Order removed successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, {
      new: true,
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//search order by email,itemID,status

export const searchOrder = async (req, res) => {
  const { email, status, itemID } = req.params;
  try {
    const order = await Order.find({
      email: email,
      status: status,
      items: {
        $elemMatch: {
          itemID: itemID,
        },
      },
    });
    if (order != null && order.length > 0) {
      res.status(200).json({
        isSuccess: true,
        order: order,
      });
    } else {
      res.status(200).json({
        isSuccess: false,
        order: order,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

export const findOrderbyEmailStatus = async (req, res) => {
  const { email, status } = req.params;
  try {
    const order = await Order.find({
      email: email,
      status: status,
    });
    if (order != null && order.length > 0) {
      res.status(200).json({
        isSuccess: true,
        order: order,
      });
    } else {
      res.status(200).json({
        isSuccess: false,
        order: order,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      isSuccess: false,
    });
  }
};
