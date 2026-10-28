import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}
