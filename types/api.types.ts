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

/** Shape returned by RTK Query when the API responds with an error. */
export interface ApiErrorResponse {
  status: number | "FETCH_ERROR" | "PARSING_ERROR" | "TIMEOUT_ERROR" | "CUSTOM_ERROR";
  data: ApiError | { message?: string; errors?: Record<string, string[]> } | string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  cursor?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
