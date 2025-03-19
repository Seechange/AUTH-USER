import { Eye, EyeOff, Loader, Lock, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "motion/react"
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'


const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { isLoading, login } = useAuthStore()
    const [isShowPass, setIsShowPass] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        login(formData)
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden '
        >
            <div className="p-8 ">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    Welcome Back
                </h2>
                <form onSubmit={handleSubmit} >
                    <Input
                        icon={Mail}
                        type='email'
                        placeholder='Email Address'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <div className="relative" >
                        <Input
                            icon={Lock}
                            type={isShowPass ? "text" : "password"}
                            placeholder='Password'
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {isShowPass ? <Eye className="text-pink-400 absolute top-2.5 right-2.5 cursor-pointer" onClick={() => setIsShowPass(!isShowPass)} />
                            : <EyeOff className="text-pink-400 absolute top-2.5 right-2.5 cursor-pointer" onClick={() => setIsShowPass(!isShowPass)} />
                        }


                    </div>

                    <div className='flex items-center ml-1 '>
                        <Link to='/forgot-password' className='text-sm text-pink-400 hover:underline'>
                            Forgot password?
                        </Link>
                    </div>


                    {/* button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className='cursor-pointer mt-5 w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white 
						font-semibold rounded-lg shadow-lg hover:from-pink-600
						hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200 hover:text-purple-500 flex justify-center'
                    >
                        {isLoading ? <Loader className='w-6 h-6 animate-spin text-center' /> : "LOGIN"}
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Don't have an account?{" "}
                    <Link to={"/signup"} className='text-pink-400 hover:underline'>
                        SignUp
                    </Link>
                </p>
            </div>

        </motion.div>
    )
}

export default LoginPage