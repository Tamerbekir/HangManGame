import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import HangMan from './client/HangMan'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HangMan />
  </StrictMode>,
)
