import mongoose from "mongoose";
import { config } from "dotenv";
config()
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("Connect MongoDB:", conn.connection.host)
    } catch (error) {
        console.log("Error from connectDB", error.message)
        process.exit(1)
    }
}