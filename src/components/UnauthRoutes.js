import { useAuth } from "../hooks/contextHooks";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function UnauthRoutes({ children }) {
  const { authUser } = useAuth();
  const location = useLocation();
  if (authUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
