import express from "express"
import { registerUser } from "../controllers/authController"
import { hashPassword } from "../middleware/hashPasword";

const router = express.Router();

router.post("/",hashPassword,registerUser);

export default router;