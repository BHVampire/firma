import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import '@sass/_toast.scss'
import 'material-icons/iconfont/material-icons.css'
import App from './App.jsx'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)