import { create } from "zustand"
import toast from "react-hot-toast"
import axiosInstance from "../libs/axios"

export const useAuthStore = create((set) => ({
    user: null,
    isCheckAuth: true,
    isLoading: false,
    error: null,
    signup: async (data) => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ user: res.data.user, isLoading: false, })
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message })
            toast.error(error.response.data.message)
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })
        try {
            const res = await axiosInstance.post("/auth/verify-email", { code })
            set({ user: res.data.user, isLoading: false })
            return res.response
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message })
            throw error
        }
    },
    login: async (data) => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ user: res.data.user, isLoading: false })
            toast.success("Login successfull")
        } catch (error) {
            set({ isLoading: false })
            toast.error(error.response.data.message)
        }
    },
    checkAuth: async () => {
        set({ isLoading: true })
        try {
            const res = await axiosInstance.get("/auth/check-auth")
            set({ user: res.data.user, isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.log(error.response.data.message)
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ user: null })
            toast.success("Logout Successfull")
        } catch (error) {
            console.log(error.message)
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true })
        try {
            await axiosInstance.post("/auth/forgot-password", { email })
            set({ isLoading: false })
            toast.success(`Email has been send to ${email}`)
        } catch (error) {
            set({ isLoading: false })
            toast.error(error.response.data.message)
        }
    },
    resetPassword: async (password, token) => {
        set({ isLoading: true })
        try {
            await axiosInstance.post(`/auth/reset-password/${token}`, { password })
            set({ isLoading: false })
            toast.success("Change Password Successfull")
        } catch (error) {
            console.log(error.message)
            set({ isLoading: false })
            toast.error(error.message)
        }
    }

}))
