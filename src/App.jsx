import { Suspense } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import MainWebsiteRoutes from './routes/main_website_routes'
// import AdminPanelRoutes from './routes/admin_panel_routes'
import Preloader from './screens/Preloader/Preloader'



function App() {


  return (
    <BrowserRouter>
   <Suspense fallback={<Preloader />}>
      <MainWebsiteRoutes />
   </Suspense>
   </BrowserRouter>
  )
}

export default App
