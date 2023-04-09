import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(cors());

const URL = process.env.MONGODB_URL;
mongoose.connect(URL);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
