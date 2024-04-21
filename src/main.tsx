import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Posts from './routes/posts'
import Root from './routes/root'

import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/:userName" element={<Posts />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
