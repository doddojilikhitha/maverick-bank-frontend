export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  address?: string;
  aadharNo?: string;
  panNo?: string;
  dob?: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  fullName: string;
  userId: number;
}

export interface User {
  userId: number;
  fullName: string;
  email: string;
  role?: string;
}