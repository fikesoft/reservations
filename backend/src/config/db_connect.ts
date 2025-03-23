import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error (
        'Database connection failed the uri is not valid'
    )
}
const dbUrl:string = process.env.MONGO_URI;

const connectDB = async () =>{
    try {
        await mongoose.connect(dbUrl); 
        console.log("Database connected succesfully")
    } catch (error:any) {
        console.log("There is some problem connecting with the DB",error.message)
        process.exit(1);
    }
}
export default connectDB