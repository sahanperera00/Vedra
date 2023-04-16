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

export const createPayment = async(req,res)=>{
    try{
        const pmt = req.body;
        const newPayment = new Pmt(pmt);
        await newPayment.save();

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
    const {product1,token} =  req.body;

    try{
        const customer = await stripe.customers.create({
            //creating the user
            email: token.email,
            source: token.id,
        });

        const trnNo = uuidv4();
        const charges = await stripe.charges.create({
            amount: product1.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased ${product1.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                },
            },

        },{
            idempotencyKey: trnNo,
        }
        );
        
        console.log("Charge Successful");
        res.status(200).json({charges});
    }catch(error){
        res.status(404).json({
            message: error
        })
        console.log(error);
    }
}



