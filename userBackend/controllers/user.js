import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import dotenv from "dotenv/config";

// import { Router } from "express";
export const registerUser = async (req, res) => {
  const { firstName, lastName, role, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ firstName, lastName, role, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//get user by id
export const getUser = async (req, res) => {
  const profile = await User.findById(req.user._id);
  res.send(profile);
};

//update user
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

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send({ status: "User details deleted" });
  } catch {
    res.status(404).json({ message: error });
  }
};

// //creating the authentication header for the user

// export const jwtauth = async(req,res,next)=>{
//     const token = req.header('x-auth-token');

//     if(!token) return res.status(401).send("Access denied.(Token not found)");
//     try{
//         const decoded = jwt.verify(token,process.end.JWTSECRET);
//         req.user = decoded;
//         console.log(req.user);
//         next();
//     }catch(error){
//         res.status(400).send("Invalid token");
//     }
// }
