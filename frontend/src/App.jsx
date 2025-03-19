import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import FloatingShape from './components/FloatingShape'
import { Toaster } from 'react-hot-toast'
import VerifyEmailPage from './pages/VerifyEmailPage'
import ForgotPassPage from './pages/ForgotPassPage'
import HomePage from './pages/HomePage'
import { useAuthStore } from './stores/useAuthStore'
import ResetPassPage from './pages/ResetPassPage'
const App = () => {
  const { user, checkAuth } = useAuthStore()
  useEffect(() => { checkAuth() }, [checkAuth])
  const userCheck = (user && user.isVerified === true)
  return (
    <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-pink-900 to-purple-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
      <FloatingShape color='bg-yellow-500' size='w-22 h-22' top='0%' left='50%' delay={2} />
      <FloatingShape color='bg-white' size='w-70 h-70' top='20%' left='70%' delay={2} />
      <FloatingShape color='bg-purple-500' size='w-50 h-50' top='60%' left='20%' delay={2} />
      <FloatingShape color='bg-black' size='w-10 h-10' top='60%' left='10%' delay={2} />
      <FloatingShape color='bg-red-500' size='w-36 h-36' top='10%' left='80%' delay={3} />
      <FloatingShape color='bg-blue-500' size='w-40 h-40' top='30%' left='30%' delay={4} />
      <FloatingShape color='bg-pink-500' size='w-28 h-28' top='50%' left='50%' delay={1} />
      <FloatingShape color='bg-orange-500' size='w-60 h-60' top='80%' left='5%' delay={6} />
      <FloatingShape color='bg-teal-500' size='w-45 h-45' top='90%' left='90%' delay={2} />
      <FloatingShape color='bg-indigo-500' size='w-55 h-55' top='15%' left='5%' delay={3} />
      <FloatingShape color='bg-gray-500' size='w-25 h-25' top='35%' left='85%' delay={4} />
      <FloatingShape color='bg-cyan-500' size='w-30 h-30' top='75%' left='55%' delay={5} />
      <FloatingShape color='bg-rose-500' size='w-20 h-20' top='95%' left='25%' delay={1} />
      <Routes>
        <Route path='/' element={userCheck ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path='/signup' element={!userCheck ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!userCheck ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/verify-email' element={!userCheck ? <VerifyEmailPage /> : <Navigate to={"/"} />} />
        <Route path='/forgot-password' element={!userCheck ? <ForgotPassPage /> : <Navigate to={"/"} />} />
        <Route path='/reset-password/:token' element={!userCheck ? <ResetPassPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </div>
  )
}


export default App
