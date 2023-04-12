import express from "express";
import {
    getOrders,
    getOrderbyId,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderbyUserEmail,
    searchOrder
    
} from "../controllers/cart.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrderbyId);
router.get("/email/:email", getOrderbyUserEmail);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/:email/:status/:itemID", searchOrder);



export default router;