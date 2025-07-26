import { Navigate, Outlet } from "react-router";

function GuestRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
