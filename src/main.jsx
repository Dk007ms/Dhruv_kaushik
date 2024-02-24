import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Components/toaststyles.css";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer stacked closeOnClick bodyClassName="toastbody" className="toastbody"/>
  </React.StrictMode>
);
