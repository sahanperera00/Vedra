import dotenv from "dotenv/config"; //Required to use the env files
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 8084;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);

const URL = process.env.MONGODB_URL;

//Connecting to mongoDB
mongoose.connect(URL);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
