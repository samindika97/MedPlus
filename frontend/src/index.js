import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


import App from "./App";

import { persistor, store } from "./app/store";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ToastContainer
        theme='dark'
        position='top-right'
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
