import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import cryto from "crypto"
import { generateToken } from "../utils/generateToken.js"
import { sendEmailResetPassSuccess, sendResetPasswordEmail, sendVerificationEmail, sendWellcomeEmail } from "../mail/email.js"
export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body
        console.log('check ', req.body)
        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email has been register" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be least 6 charactor" })
        }
        //bam password
        const salt = await bcryptjs.genSalt(10)
        const hashPass = await bcryptjs.hash(password, salt)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()


        const newUser = new User({
            email,
            password: hashPass,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        })

        await newUser.save()

        generateToken(newUser._id, res)
        await sendVerificationEmail(newUser.email, verificationToken)
        res.status(200).json({
            message: "Register successfull", user: {
                ...newUser._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log("Error from signup", error.message)
        res.status(500).json("Error Server")
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification code" })
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
        await sendWellcomeEmail(user.email, user.name)
        res.status(200).json({
            message: "Verify Email successfull", user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error from verify Email", error.message)
        res.status(500).json({ message: "Error Server" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Email hasn't been registed" })
        }
        const checkPass = await bcryptjs.compare(password, user.password)
        if (!checkPass) {
            return res.status(400).json({ message: "Password is correct" })
        }
        generateToken(user._id, res)
        user.lastLogin = new Date()
        await user.save()
        res.status(200).json({
            message: "Login Successfull", user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error from login", error.message)
        res.status(500).json("Error Server")
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({ message: "Logout successfull" })
    } catch (error) {
        console.log("Error from logout", error.message)
        res.status(500).json("Error Server")
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email }).select("-password")
        if (!user) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        const resetToken = await cryto.randomBytes(20).toString("hex")
        const resetTokenExpired = Date.now() + 1 * 60 * 60 * 1000
        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpired
        await user.save()
        sendResetPasswordEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({
            message: "Success", user: user
        })

    } catch (error) {
        console.log("Error from resetPass", error.message)
        res.status(500).json("Error Server")
    }
}

export const resetPassword = async (req, res) => {
    const { password } = req.body
    const { token } = req.params
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            // resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ message: "Invalid Token or TokenExpired" })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPass = await bcryptjs.hash(password, salt)
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        user.password = hashPass
        await user.save()
        await sendEmailResetPassSuccess(user.email, user.name)
        res.status(200).json({
            message: "Success", user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error from resetPass", error.message)
        res.status(500).json({ message: "Error Server" })
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json({ message: "success", user: req.user })
    } catch (error) {
        console.log("Error from checkAuth", error.message)
        res.status(500).json({ message: "Error Server" })
    }
}

