import express from "express";

import { getAllUsers, getUser, jwtauth, registerUser,loginUser, updateUser, deleteUser} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", jwtauth,getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;