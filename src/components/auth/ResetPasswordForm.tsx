import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import api from '../../api/lib/axios';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Password dan konfirmasi password tidak cocok.");
      return;
    }
console.log("Kirim ke backend:", { token, newPassword }); 
    try {
      await api.post("/api/auth/reset-password", {
        token,
        newPassword,
      });

      setSuccess(true);
      setMessage("Password berhasil diubah. Kamu akan diarahkan ke halaman login.");
      setTimeout(() => navigate("/signin"), 3000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Gagal mereset password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-50">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            required
          />
          <input
            type="password"
            placeholder="Konfirmasi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 w-full rounded"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${success ? "text-cyan-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
