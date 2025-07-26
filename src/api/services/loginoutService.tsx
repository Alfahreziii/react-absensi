import api from '../lib/axios';
import { LogInOut } from '../types/loginout';

export const getLogInOut = async (): Promise<LogInOut[]> => {
  try {
    const response = await api.get('/api/loginout');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// Ganti tipe parameter jadi eksplisit hanya 2 field
export const createLogInOut = async (data: { tempat: string; status: string }) => {
  const res = await api.post("/api/loginout", data); // Atau sesuaikan endpoint
  return res.data;
};

// Delete LogInOut
export const deleteLogInOut = async (id: number) => {
  try {
    const response = await api.delete(`/api/loginout/${id}`);
    return response.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

export const getLogInOutById = async (id: number): Promise<LogInOut | undefined> => {
  try {
    const response = await api.get("/api/loginout"); // Ambil semua data
    const allData: LogInOut[] = response.data.data;

    const found = allData.find((item) => item.id === id);
    if (!found) {
      throw new Error("Data tidak ditemukan");
    }

    return found;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};
