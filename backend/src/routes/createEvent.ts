import express from "express";
import { eventSchema } from "../validator";  // Correctly structured middleware
import { validateRequest } from "../middleware/validateRequest"; 
import { createEvent } from "../controllers/eventController";

const router = express.Router();

router.post("/", eventSchema, validateRequest, createEvent); 

export default router;
