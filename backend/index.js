import express from "express";
import authRoutes from "./routers/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./libs/db.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"
dotenv.config()
const PORT = process.env.PORT
const app = express()
const __dirname = path.resolve();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
app.listen(PORT, () => {
    console.log("Server is running port:", PORT)
    connectDB()
})