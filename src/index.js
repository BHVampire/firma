import React from 'react'
import ReactDOM from 'react-dom'
import './styles/utils/bootstrap/bootstrap-grid.scss'
import './styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import '@sass/_toast.scss'
import 'material-icons/iconfont/material-icons.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'

// eslint-disable-next-line
// import "swiper/css/bundle"

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer limit={3} />
  </React.StrictMode>,
  document.getElementById('root')
)