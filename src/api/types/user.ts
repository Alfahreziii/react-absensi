// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role?: string | null;
  email_verified_at?: string | null;
  remember_token?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
