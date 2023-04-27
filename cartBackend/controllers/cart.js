import Order from "../models/cart.js";

//get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get order by id
export const getOrderbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//  get order by user email
export const getOrderbyUserEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const order = await Order.find({ email: email });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get order by status
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

//delete order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndRemove(id);
    res.status(200).json({ message: "Order removed successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//update order
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

//add item to cart
export const addItemToCart = async (req, res) => {
  const item = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.items.push(item);
    order.total += item.price * item.quantity;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//remove item from cart
export const removeItemFromCart = async (req, res) => {
  const item = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.items.pull(item);
    order.total -= item.price * item.quantity;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//update item quantity
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

//get order by email and status
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

//get order by email and status
export const getCartOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "cart" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get order by email and status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.body;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
    console.log("id", id);
    console.log("status", status);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

//get order by email and status
export const updateItemQuantity = async (req, res) => {
  const orderId = req.params.orderId;
  const itemId = req.params.itemId;
  const quantity = req.body.quantity;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    const itemIndex = order.items.findIndex((item) => item.itemID === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in order" });
    }
    order.items[itemIndex].quantity = quantity;
    order.total = 0;
    order.items.forEach((item) => {
      order.total += item.price * item.quantity;
    });
    await order.save();
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
