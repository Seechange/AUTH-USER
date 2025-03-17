import express from "express";
import authRoutes from "./routers/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./libs/db.js"
import cookieParser from "cookie-parser";
dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
    console.log("Server is running port:", PORT)
    connectDB()
})