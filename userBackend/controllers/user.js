import User from "../model/user.js";
import bcrypt from "bcryptjs";

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

export const createUser = (req, res) => {
    const { firstName,
            lastName,
            email,password} = req.body;
    
    try {
        bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(password, salt, async(err, hash)=> {

        const hashedPassword  = hash;
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            });
           
            await newUser.save();
             res.status(201).json(newUser);    
        });
         
});
        
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

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