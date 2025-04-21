import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import './assest/css/style.scss'
import { AdminAuthProvider } from './components/AdminAuth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
  </StrictMode>,
)
