import express from "express"
import { readEvent } from "../controllers/eventController"
const router = express.Router()

router.get("" , readEvent);

export default router;