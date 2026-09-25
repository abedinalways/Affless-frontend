import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types/api.types";
import { CookieHelper } from "@/helper/cookie.helper";
import { COOKIE_KEYS } from "@/config/app.config";

const persistSession = (user: User, accessToken: string, refreshToken?: string) => {
  CookieHelper.set({ key: COOKIE_KEYS.USER, value: JSON.stringify(user) });
  CookieHelper.set({ key: COOKIE_KEYS.ACCESS_TOKEN, value: accessToken });
  if (refreshToken) CookieHelper.set({ key: COOKIE_KEYS.REFRESH_TOKEN, value: refreshToken });
};

const getUserFromCookie = (): User | null => {
  if (typeof window === "undefined") return null;
  const userCookie = CookieHelper.get({ key: COOKIE_KEYS.USER });
  if (!userCookie) return null;
  try {
    return JSON.parse(userCookie);
  } catch {
    return null;
  }
};

const getAccessTokenFromCookie = (): string | null => {
  if (typeof window === "undefined") return null;
  return CookieHelper.get({ key: COOKIE_KEYS.ACCESS_TOKEN }) || null;
};

const getRefreshTokenFromCookie = (): string | null => {
  if (typeof window === "undefined") return null;
  return CookieHelper.get({ key: COOKIE_KEYS.REFRESH_TOKEN }) || null;
};

const initialState: AuthState = {
  user: getUserFromCookie(),
  accessToken: getAccessTokenFromCookie(),
  refreshToken: getRefreshTokenFromCookie(),
  isAuthenticated: !!getAccessTokenFromCookie(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken?: string;
      }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken ?? null;
      state.isAuthenticated = true;
      state.error = null;

      persistSession(user, accessToken, refreshToken);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    tokenRefreshed: (state, action: PayloadAction<{ accessToken: string; refreshToken?: string }>) => {
      state.accessToken = action.payload.accessToken;
      if (action.payload.refreshToken) state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear cookies
      CookieHelper.destroy({ key: COOKIE_KEYS.USER });
      CookieHelper.destroy({ key: COOKIE_KEYS.ACCESS_TOKEN });
      CookieHelper.destroy({ key: COOKIE_KEYS.REFRESH_TOKEN });
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        CookieHelper.set({ key: COOKIE_KEYS.USER, value: JSON.stringify(state.user) });
      }
    },
  },
});

export const {
  setCredentials,
  setError,
  clearError,
  setLoading,
  tokenRefreshed,
  logout,
  updateUser,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
