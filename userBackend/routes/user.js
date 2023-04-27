import express from "express";
import {
  getAllUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//Main routes
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile", auth, getUser);
router.get("/all", getAllUsers);
// router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
