import {
  getFromUser,
  createPayment,
  getAllPayments,
  chargeUser,
  getPaymentbyId,
  getPaymentbyOrderId,
} from "../controllers/pmtCtrl.js";
import express from "express";
import cors from "cors";

const router = express.Router();

//Main routes
router.options("*", cors());
router.post("/create", createPayment);
router.get("/payment/:id", getPaymentbyId);
router.get("/:email", getFromUser);
//router.options("/pay",cors());
router.post("/pay", chargeUser);
router.get("/", getAllPayments);
router.get("/orderId/:orderId", getPaymentbyOrderId);

export default router;
