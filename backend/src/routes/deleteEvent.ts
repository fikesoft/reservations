import express from "express"
import { deleteEvent } from "../controllers/eventController";
const router = express.Router();

router.delete("/",deleteEvent)

export default router
