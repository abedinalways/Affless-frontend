import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { APP_CONFIG, COOKIE_KEYS } from "@/config/app.config";
import { CookieHelper } from "@/helper/cookie.helper";
import { tokenRefreshed } from "@/lib/redux/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: APP_CONFIG.apiUrl,
  prepareHeaders: (headers) => {
    // Only run on client side for SSR compatibility
    if (typeof window !== "undefined") {
      const token = CookieHelper.get({ key: COOKIE_KEYS.ACCESS_TOKEN });
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

let refreshPromise: Promise<boolean> | null = null;

const clearClientSession = () => {
  CookieHelper.destroy({ key: COOKIE_KEYS.ACCESS_TOKEN });
  CookieHelper.destroy({ key: COOKIE_KEYS.REFRESH_TOKEN });
  CookieHelper.destroy({ key: COOKIE_KEYS.USER });
};

const refreshAccessToken = async (
  api: Parameters<typeof baseQuery>[1],
  extraOptions: Parameters<typeof baseQuery>[2],
) => {
  const refreshToken = CookieHelper.get({ key: COOKIE_KEYS.REFRESH_TOKEN });
  if (!refreshToken) return false;

  const refreshResult = await baseQuery(
    { url: "/auth/refresh", method: "POST", body: { refreshToken } },
    api,
    extraOptions,
  );
  const response = refreshResult.data as
    | { authorization?: { access_token?: string; refresh_token?: string } }
    | undefined;

  const accessToken = response?.authorization?.access_token;
  const newRefreshToken = response?.authorization?.refresh_token;

  if (!accessToken) return false;
  CookieHelper.set({ key: COOKIE_KEYS.ACCESS_TOKEN, value: accessToken });
  if (newRefreshToken) {
    CookieHelper.set({ key: COOKIE_KEYS.REFRESH_TOKEN, value: newRefreshToken });
  }
  api.dispatch(tokenRefreshed({ accessToken, refreshToken: newRefreshToken }));
  return true;
};

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Prevent infinite loop: don't retry refresh endpoint itself
    const argUrl = typeof args === "string" ? args : args.url;
    if (argUrl.includes("/auth/refresh")) {
      return result;
    }

    try {
      // All requests that fail together share one refresh request.
      refreshPromise ??= refreshAccessToken(api, extraOptions).finally(() => {
        refreshPromise = null;
      });
      if (await refreshPromise) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        clearClientSession();
      }
    } catch {
      clearClientSession();
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Jobs", "Users", "Messages", "Editor", "Client"],
  endpoints: () => ({}),
});

export default api;
