import express from "express";
import {
  getAllUsers,
  registerUser,
  loginUser,
  deleteUser,
} from "../../controllers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
