import { useAuth } from "../hooks/contextHooks";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function UnauthRoutes({ children }) {
  const { authUser, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <p>Loading please wait</p>;
  }
  if (authUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
