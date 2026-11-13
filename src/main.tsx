import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Mount the dashboard into the root element provided by index.html.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
