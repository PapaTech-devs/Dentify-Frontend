import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthUserProvider } from "./hooks/contextHooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import LandingPage from "./routes/LandingPage";
import Dashboard from "./routes/Dashboard";
import AuthRoutes from "./components/AuthRoutes";
import UnauthRoutes from "./components/UnauthRoutes";
import { UserDataProvider } from "./hooks/userHooks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthUserProvider>
    <UserDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route
              path="login"
              element={
                <UnauthRoutes>
                  <LoginPage />
                </UnauthRoutes>
              }
            />
            <Route
              path="register"
              element={
                <UnauthRoutes>
                  <RegisterPage />
                </UnauthRoutes>
              }
            />
            <Route
              path="dashboard"
              element={
                <AuthRoutes>
                  <Dashboard />
                </AuthRoutes>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserDataProvider>
  </AuthUserProvider>
);
