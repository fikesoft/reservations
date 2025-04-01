import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db_connect";
import { 
  googleAuth ,
  googleAuthCallback,
  registerUser,
  loginUser,
  createEvent,
  readEvent,
  deleteEvent,
  editEvent
} from "./routes";

const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());

connectDB()

app.use(
    cors({
      origin: process.env.ORIGIN || ("http://localhost:5173"),
      credentials: true, 
    })
  );

//Routes
app.use('/api/auth/google',googleAuth)
app.use('/api/auth/callback',googleAuthCallback)
app.use('/api/register/user',registerUser)
app.use('/api/login/user',loginUser)

//CRUD EVENTS 
app.use ('/api/create-event',createEvent)
app.use ('/api/read-event',readEvent)
app.use ('/api/delete-event',deleteEvent)
app.use ('/api/edit-event',editEvent)






const PORT = 7000
app.listen(7000,()=>{
    console.log(` Server running in mode on http://localhost:${PORT}`);

})