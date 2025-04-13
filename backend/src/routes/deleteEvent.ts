import express from "express"
import { deleteEvent } from "../controllers/eventController";
const router = express.Router();

router.delete("/:id",deleteEvent)

export default router
