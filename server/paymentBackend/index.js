import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config"; //Required to use the env files
import router from "./routes/pmtRoutes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Assigning routes
app.use("/payment", router);
const PORT = process.env.PORT || 8082;
const URL = process.env.MONGODBURL;
console.log(URL);

//Connecting to mongoDB
mongoose.set("strictQuery", false); // To hide the deprecated warnings
mongoose.connect(URL);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB payment database connection successful!");
});

//Starting the server
app.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
});
