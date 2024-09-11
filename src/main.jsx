import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LoginForm from './components/LoginSignup/LoginSignup.jsx'
import OtpScreen from './screens/OtpScreen/OtpScreen.jsx'
import MainLayout from './screens/MainLayout/MainLayout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />} >
      <Route path='getotp' element={<OtpScreen />} />
      <Route path='home' element={<MainLayout />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
