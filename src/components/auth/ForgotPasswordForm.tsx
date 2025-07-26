import { useState } from "react";
import api from '../../api/lib/axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // ⬅️ NEW

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return; // ⬅️ Cegah double submit

    setLoading(true); // ⬅️ Set loading

    try {
      const response = await api.post("/api/auth/forgot-password", { email });
      setSuccess(true);
      setMessage(response.data.message || "Link reset password telah dikirim ke email Anda.");
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.response?.data?.message || "Terjadi kesalahan saat mengirim email.");
    } finally {
      setLoading(false); // ⬅️ Reset loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-50">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-700">Lupa Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Masukkan email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            required
            disabled={loading}
          />
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-cyan-600 hover:bg-cyan-700'}`}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Link Reset"}
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
