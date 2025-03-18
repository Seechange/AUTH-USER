import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { config } from "dotenv"
config()
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(400).json({ message: "Unauthorized token" })
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodeToken) {
            return res.status(400).json({ message: "Invalid Token" })
        }
        const user = await User.findById(decodeToken.userId).select("-password")
        if (!user) {
            return res.status.json({ message: "User not found" })
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Error from protectRoute", error.message)
        res.status(500).json({ message: "Error Server" })
    }

}