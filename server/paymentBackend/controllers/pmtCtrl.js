import Pmt from "../models/pmtModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv/config.js";

import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

//MONGODB Controllers

//Retrieves document by passing the client email
export const getFromUser = async (req, res) => {
  try {
    const email = req.params.email;
    const payments = await Pmt.find({ email: email });
    res.status(200).json(payments);
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
};

//Retrieves document by passing the paymentID
export const getPaymentbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Pmt.findById(id);
    res.status(200).json(payment);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

//creating a payment
export const createPayment = async (req, res) => {
  try {
    const pmt = req.body; //Taking the parameters from the JSON body passed down to the API
    const newPayment = new Pmt(pmt);
    await newPayment.save();
    console.log("Payment after reaching create payment", pmt);

    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

//fetching all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Pmt.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

//Stripe Controller
const stripe = new Stripe(process.env.STRIPESECRET);

//Creating a stripe Payment Session
export const chargeUser = async (req, res) => {
  const { orderItems, orderId } = req.body;
  console.log("Order ID: ", orderId);
  console.log("orderItems: ", orderItems);
  const line_items = orderItems.map((item) => {
    //creating a list of all items inside the order to be displayed in the session
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.itemID,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: parseInt(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

  console.log("List of all the Items: ", line_items);

  //creating a session
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "SL", "SR", "IN", "NZ", "PA", "LK"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 1500, currency: "usd" },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 1 },
          },
        },
      },
    ],

    line_items, //passing the list of items to the session
    mode: "payment",
    success_url: `http://localhost:3000/pmtsuccess/${orderId}`,
    cancel_url: `http://localhost:3000/failed`,
    payment_intent_data: {
      receipt_email: "vedraindustries@gmail.com",
    },
  });
  res.send({ url: session.url }); //Passing the URL to the frontend
};

//Creating a stripe Payment Session
export const getPaymentbyOrderId = async (req, res) => {
  try {
    const orderNo = req.params.orderId;
    const payment = await Pmt.find({ orderNo: orderNo });
    res.status(200).json(payment);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
