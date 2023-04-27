import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  star: {
    total: {
      type: Number,
      default: 0,
    },
    reviewers: [
      {
        comment: {
          type: String,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
        },
      },
      { timestamps: true },
    ],
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  sellerId: {
    type: String,
    required: true,
  },
  sellerEmail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Create collection and add schema
const Item = mongoose.model("Item", itemSchema);

export default Item;
