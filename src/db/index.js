import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { log } from "console";

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI.trim()}/${DB_NAME}`)
        console.log(`MongoDB connected successfully ! yeah !! ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB connection error:",error);
        process.exit(1);
    }
}

export default dbConnect

