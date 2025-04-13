import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from "./store/store.ts"
import App from './App.tsx'
//Global
import "./assets/style/reset.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer autoClose={3000} position="top-right" style={{zIndex:"100000"}} />
    </Provider>
  </StrictMode>,
)
