import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router'
import Posts from './routes/posts'
import Root from './routes/root'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/:userName" element={<Posts />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
