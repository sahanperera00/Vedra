import User from "../model/user.js";
// import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const registerUser = async(req, res) => {
    const { firstName,
            lastName,
            email,password} = req.body;
    
    //validation to see if the email already exists

        let user = await User.findOne({email});
        if(user) return res.status(400).send("User already exists");

        //Saving data to the database

        //incase of an error it has to be handled 
        try{
            user = new User({
                firstName,
                lastName, 
                email,
                password
            })
            await user.save();  //this saves the user 

            //along with this ensure to create the JWT Token
            const data = jwt.sign({
                _id: user._id,
                firstName: user.firstName,
                email: user.email,
            })

            //JWT secret key is created by yourself in process.env which is encrypted
            const token = jwt.sign(data,process.env.JWTSECRET,{expiresIn: '0.5h'});

            res.status(201).json(token);
            
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    export const loginUser = async(req,res)=>{
        const {email, password} = req.body;
        let user = await User.findOne({email,password});

        if(!user) return res.status(400).send("Invalid email or password");

        //Create a jwt data token 

        const data = {_id: user._id,
            firstName: user.firstName, 
            email: user.email};

        const token = jwt.sign(data,process.env.JWTSECRET,{expiresIn:'1h'});
        res.status(200).json({token});
    }

    //creating the authentication header for the user 

    export const jwtauth = async(req,res,next)=>{
        const token = req.header('x-auth-token');

        if(!token) return res.status(401).send("Access denied.(Token not found)");
        try{
            const decoded = jwt.verify(token,process.end.JWTSECRET);
            req.user = decoded;
            console.log(req.user);
            next();
        }catch(error){
            res.status(400).send("Invalid token");
        }
    }


export const updateUser = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        await User.findByIdAndUpdate(id, update);
        res.status(200).send({ status: "User details updated" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).send({ status: "User details deleted" });
    } catch {
        res.status(404).json({ message: error });
    }
};