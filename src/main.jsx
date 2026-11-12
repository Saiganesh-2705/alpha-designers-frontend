import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LangProvider } from "./context/LangContext.jsx";
import { QuoteProvider } from "./context/QuoteContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LangProvider>
        <QuoteProvider>
          <App />
        </QuoteProvider>
      </LangProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
