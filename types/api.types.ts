export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  phone_number?: string | null;
  role: 'admin' | 'client' | 'editor';
  user_type: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta_data?: {
    total: number;
    page: number;
    limit: number;
    next_cursor?: string | null;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
