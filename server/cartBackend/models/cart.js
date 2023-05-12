import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  items: [
    {
      itemID: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      sellerID: {
        type: String,
        required: true,
      },
      sellerEmail: {
        type: String,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  shippingMethod: {
    type: String,
    required: false,
  },
});

// Create collection and add schema
const Order = mongoose.model("Order", orderSchema);

export default Order;
