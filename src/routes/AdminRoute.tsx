import { Navigate, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";

// Tipe sesuai isi token JWT kamu
interface MyJwtPayload {
  id: number;
  email: string;
  role: string;
  exp: number;
}

const AdminRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/signin" replace />;

  try {
    const decoded = jwtDecode<MyJwtPayload>(token);

    return decoded.role === "admin"
      ? <Outlet />
      : <Navigate to="/404" replace />; // <== redirect ke halaman NotFound

  } catch (error) {
    console.error("Token tidak valid:", error);
    return <Navigate to="/signin" replace />;
  }
};

export default AdminRoute;
