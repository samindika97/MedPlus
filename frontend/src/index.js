import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./pages/ChatPage/context/AuthContext";

import App from "./App";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistedStore } from "./store";

import Splash from "./components/splash";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <React.Suspense fallback={<Splash />}>
          <AuthContextProvider>
            <ToastContainer
              theme="dark"
              position="top-right"
              autoClose={3000}
              closeOnClick
              pauseOnHover={false}
            />
            <App />
          </AuthContextProvider>
        </React.Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
