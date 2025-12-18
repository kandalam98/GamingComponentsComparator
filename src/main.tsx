import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MouseComparator from './mouseCompare'
import "./index.css"; // or main.css

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MouseComparator />
  </StrictMode>,
)
