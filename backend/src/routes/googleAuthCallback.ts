import expres from "express"
import { googleAuthCallback } from "../controllers/authController"
const router = expres.Router()

router.get('/',googleAuthCallback)

export default router;