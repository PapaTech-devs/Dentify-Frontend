import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthUserProvider } from "./hooks/contextHooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import LandingPage from "./routes/LandingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthUserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthUserProvider>
);
