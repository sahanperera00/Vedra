import { getFromUser,createPayment,getAllPayments } from "../controllers/pmtCtrl.js";
import express from "express";

const router = express.Router();

router.post("/create",createPayment);
router.get("/:email",getFromUser);
router.get("/",getAllPayments);

export default router;
