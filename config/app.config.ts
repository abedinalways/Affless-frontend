export const APP_CONFIG = {
  name: "Waffless",
  description: "Waffless Client & Editor Marketplace",
  apiUrl: process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3001/api",
} as const;

export const COOKIE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
} as const;
