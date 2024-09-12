import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
// import LoginForm from './components/LoginSignup/LoginSignup.jsx'
const LoginForm = lazy(() => import('./components/LoginSignup/LoginSignup.jsx'))
import OtpScreen from './screens/OtpScreen/OtpScreen.jsx'
import MainLayout from './screens/MainLayout/MainLayout.jsx'
import Preloader from './screens/Preloader/Preloader.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Routes>
//       <Route path='/' element={<LoginForm />}/>
//       <Route path='getotp' element={<OtpScreen />} />
//       <Route path='home' element={<MainLayout />} />
//       </Routes>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <Suspense fallback={<Preloader />}>
      <Routes>
      <Route path='/' element={<LoginForm />}/>
      <Route path='getotp' element={<OtpScreen />} />
      <Route path='home' element={<MainLayout />} />
      </Routes>
   </Suspense>
   </BrowserRouter>
  </StrictMode>,
)
