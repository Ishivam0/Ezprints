import { Routes, Route } from 'react-router-dom';
// const LoginForm = lazy(() => import('../components/LoginSignup/LoginSignup'))
import OtpScreen from '../screens/OtpScreen/OtpScreen'
import MainLayout from '../screens/MainLayout/MainLayout'
import { lazy } from 'react'
const LoginForm = lazy(() => import('../components/LoginSignup/LoginSignup'))
import React from 'react'


const MainWebsiteRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<LoginForm/>} /> 
    <Route path="/getotp" element={<OtpScreen />} /> 
    <Route path="/home" element={<MainLayout />}/>
  </Routes>
  )
}

export default MainWebsiteRoutes