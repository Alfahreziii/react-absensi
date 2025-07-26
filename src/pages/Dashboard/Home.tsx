import { Navigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import { jwtDecode } from "jwt-decode";

// Tipe sesuai isi token JWT kamu
interface MyJwtPayload {
  id: number;
  email: string;
  role: string;
  exp: number;
}

export default function Home() {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/signin" replace />;

    const decoded = jwtDecode<MyJwtPayload>(token);

  if (decoded.role === "admin") {
        return (
      <>
        <PageMeta
          title="Concept"
          description="Concept"
        />
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
          </div>

          <div className="col-span-12 xl:col-span-5">
          </div>

          <div className="col-span-12">
          </div>
        </div>
      </>
    );
  } else if (decoded.role === "user") {
    return <Navigate to="/user" replace />;
  }
}