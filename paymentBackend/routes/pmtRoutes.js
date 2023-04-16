import { getFromUser,createPayment,getAllPayments, chargeUser } from "../controllers/pmtCtrl.js";
import express from "express";
import cors from "cors";

const router = express.Router();

router.options('*',cors())
router.post("/create",createPayment);
router.get("/:email",getFromUser);
//router.options("/pay",cors());
router.post("/pay",chargeUser);
router.get("/",getAllPayments);

export default router;
