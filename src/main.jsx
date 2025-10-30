import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { supabase } from './supabase/client.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App supabase={supabase} />
  </StrictMode>,
)
