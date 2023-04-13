import Pmt from "../models/pmtModel.js";
import mongoose from "mongoose";

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