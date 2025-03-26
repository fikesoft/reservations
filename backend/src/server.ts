import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db_connect";
import { googleAuth ,googleAuthCallback,registerUser,loginUser} from "./routes";

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




const PORT = 7000
app.listen(7000,()=>{
    console.log(` Server running in mode on http://localhost:${PORT}`);

})