import express from "express";
import {
  getItems,
  getItembyId,
  createItem,
  updateItem,
  deleteItem,
  getItemsbyCategory,
  getItemsbySeller,
  addReview,
} from "../controllers/item.js";

const router = express.Router();

//Main routes
router.get("/", getItems);
router.post("/", createItem);
router.get("/:id", getItembyId);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

router.get("/category/:category", getItemsbyCategory);
router.get("/seller/:sellerId", getItemsbySeller);
router.post("/review/:id", addReview);

export default router;
