import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { clearLegacyLocalAdminData } from './lib/auth'
import {
  prefetchPublicTestimonials,
  scheduleIdlePrefetch,
} from './hooks/useAdminData'

clearLegacyLocalAdminData()
scheduleIdlePrefetch(() => {
  void prefetchPublicTestimonials()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
