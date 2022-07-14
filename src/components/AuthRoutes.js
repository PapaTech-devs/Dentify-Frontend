import { useAuth } from "../hooks/contextHooks";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function AuthRoutes({ children }) {
  const { authUser } = useAuth();
  const location = useLocation();
  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
