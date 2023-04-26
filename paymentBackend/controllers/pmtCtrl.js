import Pmt from "../models/pmtModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv/config"; 

import Stripe from "stripe";
import {v4 as uuidv4} from "uuid";


//MONGODB Controllers
export const getFromUser = async(req,res)=>{
    try{
        const email = req.params.email
        const payments = await Pmt.find({email : email});
        res.status(200).json(payments);
    }catch(err){
        res.status(404).json(({
            message:err
        }))
    }   
}

export const getPaymentbyId = async(req,res)=>{
    try{
        const id = req.params.id;
        const payment = await Pmt.findById(id);
        res.status(200).json(payment);
    }catch(error){
        res.status(404).json({
            message:error
        })
    }
}

export const createPayment = async(req,res)=>{
    try{
        const pmt = req.body;
        const newPayment = new Pmt(pmt);
        await newPayment.save();
        console.log('Payment after reaching create payment',pmt);

        res.status(201).json(newPayment);
    }catch(error){
        res.status(400).json({
            message:error
        })
    }
}

export const getAllPayments = async(req,res)=>{

    try{
        const payments = await Pmt.find();
        res.status(200).json(payments);
    }catch(error){
        res.status(400).json({
            message:error
        })
    }
}

//Stripe Controller
const stripe = new Stripe(process.env.STRIPESECRET);

export const chargeUser = async(req,res)=>{

    const {orderItems,orderId} = req.body;
    console.log("Order ID: ", orderId);
    console.log('orderItems: ',orderItems);
    const line_items = orderItems.map((item)=>{
        return{
            price_data:{
                currency: "usd",
                product_data:{
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

    console.log("List of all the Items: " ,line_items);

   
    const session  = await stripe.checkout.sessions.create({
        shipping_address_collection: {
            allowed_countries: ['US', 'CA','SL','SR','IN','NZ','PA','LK'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {amount: 0, currency: 'usd'},
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: {unit: 'business_day', value: 5},
                maximum: {unit: 'business_day', value: 7},
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {amount: 1500, currency: 'usd'},
              display_name: 'Next day air',
              delivery_estimate: {
                minimum: {unit: 'business_day', value: 1},
                maximum: {unit: 'business_day', value: 1},
              },
            },
          },
        ],
        
        line_items,
        mode: "payment",
        success_url: `http://localhost:3000/pmtsuccess/${orderId}`,
        cancel_url: `http://localhost:3000/failed`,
        payment_intent_data:{
            receipt_email: "vedraindustries@gmail.com",
        }
    });
    //console.log(res.body);
    res.send({url: session.url});
}



