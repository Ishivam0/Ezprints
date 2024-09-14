import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/app/store.js'

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
   <Provider store={store}>
    <App />
   </Provider>
  </StrictMode>,
)
