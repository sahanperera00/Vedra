import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import routers from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8070;

app.use(express.json());
app.use(cors());

routers(app);

app.listen(PORT, () => {
  console.log(`Gateway is running on port: ${PORT}`);
});
