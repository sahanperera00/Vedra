import mongoose from "mongoose";

// Create Schema
const Schema = mongoose.Schema;
const pmtSchema = new Schema({
  invoiceNo: {
    type: String,
    required: true,
  },
  orderNo: {
    type: String,
  },
  pmtDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  grossPrice: {
    type: Number,
    required: true,
  },
  netPrice: {
    type: Number,
    required: true,
  },
});

// Create collection and add schema
const Pmt = mongoose.model("Payments", pmtSchema);
export default Pmt;
