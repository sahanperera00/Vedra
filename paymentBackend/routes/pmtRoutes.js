import { getFromUser,createPayment,getAllPayments, chargeUser } from "../controllers/pmtCtrl.js";
import express from "express";

const router = express.Router();

router.post("/create",createPayment);
router.get("/:email",getFromUser);
router.post("/pay",chargeUser);
router.get("/",getAllPayments);

export default router;
