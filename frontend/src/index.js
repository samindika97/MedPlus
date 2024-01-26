import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';
import "react-toastify/dist/ReactToastify.css";
//import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ToastContainer
        theme='dark'
        position='top-right'
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
      <App />
  </React.StrictMode>
);
