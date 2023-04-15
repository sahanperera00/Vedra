import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  shippingMethod: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
