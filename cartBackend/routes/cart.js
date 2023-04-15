import express from "express";
import {
  getOrders,
  getOrderbyId,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderbyUserEmail,
  searchOrder,
  findOrderbyEmailStatus,
  addItemToCart,
  removeItemFromCart,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrderbyId);
router.get("/email/:email", getOrderbyUserEmail);
// router.patch("/:id", updateOrder);
router.post("/:id/addItem", addItemToCart);
router.post("/:id/removeItem", removeItemFromCart);
router.delete("/:id", deleteOrder);
router.get("/:email/:status/:itemID", searchOrder);
router.get("/:email/:status", findOrderbyEmailStatus);

export default router;
