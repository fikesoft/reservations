import express from "express" 
import { eventIdSchema,eventSchema} from "../validator"
import { editEvent } from "../controllers/eventController"
const router = express.Router()

router.put("/:id",eventIdSchema,eventSchema,editEvent)

export default router