import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db_connect";

const cors = require("cors");
dotenv.config();

const app = express();

connectDB()

app.use(
    cors({
      origin: process.env.ORIGIN || ("http://localhost:5173"),
      credentials: true, 
    })
  );

const PORT = 7000
app.listen(7000,()=>{
    console.log(` Server running in mode on http://localhost:${PORT}`);

})