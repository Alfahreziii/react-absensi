import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: any; // jika ada properti lain
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

