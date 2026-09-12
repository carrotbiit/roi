import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { VolunteerPage } from './VolunteerPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VolunteerPage />
  </StrictMode>,
)
