import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Navigate } from "react-router";
import { useEffect } from 'react';
import { isTokenExpired } from "./utils/jwtHelper"; // Adjust the import path as necessary

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import ResetPasswordPage from "./components/auth/ResetPasswordForm.tsx";
import ForgotPasswordPage from "./components/auth/ForgotPasswordForm";

import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";

import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import LogTable from "./pages/Tables/LogTable.tsx";
import UserTable from "./pages/Tables/UserTable";

import GuestRoute from "./routes/GuestRoute";
import VerifyEmail from "./pages/AuthPages/VerifyEmail";
import ProtectedRoute from "./routes/ProtectedRoute";

import AdminRoute from "./routes/AdminRoute";
export default function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');// trigger redirect
    }
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<LogTable />} />
              <Route path="/profile" element={<UserProfiles />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route element={<AppLayout />}>
                {/* Tables */}
                <Route path="/log-tables" element={<LogTable />} />
                <Route path="/user-tables" element={<UserTable />} />

                {/* Ui Elements */}
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} />

                {/* Charts */}
                <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} />
              </Route>
            </Route>
          </Route>
          {/* Auth Layout */}
          <Route element={<GuestRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/blank" element={<Blank />} />
          </Route>

          {/* Fallback Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </>
  );
}
