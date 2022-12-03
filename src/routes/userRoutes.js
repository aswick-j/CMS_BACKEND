import express from "express";
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.post("/add", createNewUser);
router.patch("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
