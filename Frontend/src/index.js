import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './store';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
const notifiConfig = {
    limit: 3,
    autoClose: 2000,
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: 'light'
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
          <ToastContainer
              {...notifiConfig}
          />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
