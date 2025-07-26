// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  agama?: string | null;
  nomor_kk?: string | null;
  nomor_nik?: string | null;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  jenis_kelamin?: "Laki-laki" | "Perempuan" | null;
  pekerjaan?: string | null;
  status?: string | null;
  alamat_rt005?: string | null;
  alamat_ktp?: string | null;
  role?: string | null;
  email_verified_at?: string | null;
  remember_token?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
