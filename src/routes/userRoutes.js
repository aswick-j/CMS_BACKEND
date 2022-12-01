import  express  from "express";
import { createNewUser, deleteUser, getAllUsers, updateUser } from "../controllers/usersController.js";

const router = express.Router();

router.post('/all',getAllUsers)
router.post('/new',createNewUser)
router.patch('/update',updateUser)
router.delete('/delete',deleteUser)


export default router