import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import './styles/theme.css'
import './index.css'
import App from './App.jsx'
import './styles/section-headings.css'
// import { ReactBitsProvider } from 'react-bits';

// Entry is deliberate on every reload, including reloads of a section hash.
history.scrollRestoration = 'manual'
if (location.hash) history.replaceState(history.state, '', location.pathname + location.search)
document.documentElement.dataset.entryStage = 'intro'
window.scrollTo({ top: 0, behavior: 'instant' })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
