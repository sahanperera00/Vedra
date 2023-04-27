import express from "express";
import {
  getOrders,
  getOrderbyId,
  createOrder,
  updateItemQuantity,
  deleteOrder,
  getOrderbyUserEmail,
  searchOrder,
  findOrderbyEmailStatus,
  addItemToCart,
  removeItemFromCart,
  getCartOrders,
  updateOrderStatus,
} from "../controllers/cart.js";

const router = express.Router();

//Main routes
router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrderbyId);
router.get("/email/:email", getOrderbyUserEmail);
router.put("/:orderId/:itemId", updateItemQuantity);
router.patch("/updateStatus", updateOrderStatus);
router.post("/:id/addItem", addItemToCart);
router.post("/:id/removeItem", removeItemFromCart);
router.delete("/:id", deleteOrder);
router.get("/:email/:status/:itemID", searchOrder);
router.get("/:email/:status", findOrderbyEmailStatus);
router.get("/status/cart/cart/cart", getCartOrders);

export default router;
