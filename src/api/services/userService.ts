import api from '../lib/axios';
import { User } from '../types/user';

export interface GetUsersResponse {
  message: string;
  data: User[];
}
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/api/users');
    return response.data.data;
  } catch (error: any) {
  const errMsg = error.response?.data?.message || "Terjadi kesalahan";
  throw new Error(errMsg);
}
};

// export const fetchUsers = async (token: string) => {
//   const response = await api.get<GetUsersResponse>('/api/users', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

export const updateProfile = async (data: any) => {
  const token = localStorage.getItem("token");
  const response = await api.put(`/api/users/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


