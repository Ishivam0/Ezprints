import { lazy, Suspense } from 'react'
const LoginForm = lazy(() => import('./components/LoginSignup/LoginSignup.jsx'))
import './App.css'
import MainLayout from './screens/MainLayout/MainLayout'
import OtpScreen from './screens/OtpScreen/OtpScreen'
import Preloader from './screens/Preloader/Preloader'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {


  return (
    <BrowserRouter>
   <Suspense fallback={<Preloader />}>
      <Routes>
      <Route path='/' element={<LoginForm />}/>
      <Route path='getotp' element={<OtpScreen />} />
      <Route path='home' element={<MainLayout />} />
      </Routes>
   </Suspense>
   </BrowserRouter>
  )
}

export default App
