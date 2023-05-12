import express from "express";
import {
  getFromUser,
  createPayment,
  getAllPayments,
  // chargeUser,
  getPaymentbyId,
  getPaymentbyOrderId,
} from "../../controllers/payment.js";

const router = express.Router();

router.post("/create", createPayment);
router.get("/payment/:id", getPaymentbyId);
router.get("/:email", getFromUser);
// router.post("/pay", chargeUser);
router.get("/", getAllPayments);
router.get("/orderId/:orderId", getPaymentbyOrderId);

export default router;
