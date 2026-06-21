import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import './styles/theme.css'
import './index.css'
import App from './App.jsx'
// import { ReactBitsProvider } from 'react-bits';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
