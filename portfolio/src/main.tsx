import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//importing pages
import HomePage from './pages/home/HomePage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage/>
  </StrictMode>
);
