import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_CONFIG, COOKIE_KEYS } from "@/config/app.config";
import { CookieHelper } from "@/helper/cookie.helper";

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

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // Prevent infinite loop: don't retry refresh endpoint itself
    const argUrl = typeof args === "string" ? args : args.url;
    if (argUrl.includes("/auth/refresh")) {
      return result;
    }

    const refreshToken = CookieHelper.get({ key: COOKIE_KEYS.REFRESH_TOKEN });

    if (refreshToken) {
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const data = refreshResult.data as { accessToken: string; refreshToken?: string };
          CookieHelper.set({ key: COOKIE_KEYS.ACCESS_TOKEN, value: data.accessToken });
          if (data.refreshToken) {
            CookieHelper.set({ key: COOKIE_KEYS.REFRESH_TOKEN, value: data.refreshToken });
          }

          // Retry original query with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh failed - force logout
          CookieHelper.destroy({ key: COOKIE_KEYS.ACCESS_TOKEN });
          CookieHelper.destroy({ key: COOKIE_KEYS.REFRESH_TOKEN });
          CookieHelper.destroy({ key: COOKIE_KEYS.USER });
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      } catch {
        // On refresh error, logout user
        CookieHelper.destroy({ key: COOKIE_KEYS.ACCESS_TOKEN });
        CookieHelper.destroy({ key: COOKIE_KEYS.REFRESH_TOKEN });
        CookieHelper.destroy({ key: COOKIE_KEYS.USER });
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    } else {
      // No refresh token - redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
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