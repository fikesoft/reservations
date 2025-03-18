import express from "express";

const app = express();
const PORT = 7000
app.listen(3000,()=>{
    console.log(` Server running in mode on http://localhost:${PORT}`);

})