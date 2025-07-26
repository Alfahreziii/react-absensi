import { Navigate, Outlet } from "react-router";
import { isTokenExpired } from "../utils/jwtHelper";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
