import express from 'express'
import { googleAuth } from '../controllers/authController'

const router = express.Router()

router.get("/",googleAuth)

export default router