export interface LogInOut {
  id: number;
  id_user: number;
  tempat: string;
  status: string;
  created_at: string;
  updated_at: string;

  User?: {
    name: string;
  };
}