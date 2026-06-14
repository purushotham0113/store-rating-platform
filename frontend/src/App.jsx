import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
function App() {
  return (

    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>



  )
}

export default App
