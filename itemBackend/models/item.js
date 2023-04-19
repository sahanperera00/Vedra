import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
        type: new Schema(
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
          { timestamps: true }
        ),
      },
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
  category: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
