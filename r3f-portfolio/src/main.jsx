import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import MouseContextProvider from "./context/mouse-context";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MouseContextProvider>
          <App />
        </MouseContextProvider>
    </React.StrictMode>,
)
