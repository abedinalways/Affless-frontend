# API integration contract

The frontend uses RTK Query as its only client-side API transport. New endpoints belong in `lib/redux/features/<feature>/<feature>Api.ts` and must be injected into the shared `api` instance.

## Required backend conventions

- Base URL: `NEXT_PUBLIC_API_ENDPOINT`, for example `https://api.example.com/api`.
- Success envelope: `{ success: true, message?: string, data?: T, meta_data?: { total, page, limit, next_cursor? } }`.
- Error envelope: `{ success: false, message: string, statusCode: number, errors?: Record<string, string[]> }`.
- Access token: return it in `data.accessToken` on login/register/refresh. Return a rotated `data.refreshToken` when applicable.
- Pagination: accept `page`, `limit`, `search`, and optionally `cursor` as query parameters.
- File upload: endpoint bodies use `FormData`; do not manually set `Content-Type` for multipart requests.

## Auth endpoints expected by the frontend

- `POST /auth/login` — `{ email, password }`
- `POST /auth/register` — `{ name, email, password, role: "client" | "editor" }`
- `POST /auth/refresh` — `{ refreshToken }`
- `GET /auth/me`
- `POST /auth/logout`
- `POST /auth/forgot-password` — `{ email }`
- `POST /auth/verify-otp` — `{ email, otp }`, returns `{ token }`
- `POST /auth/reset-password` — `{ token, password }`

`apiSlice` retries a failed request once after a shared refresh operation. A simultaneous batch of 401 responses produces one refresh request, not one per request.

## Adding a resource

1. Define request and response DTOs next to the feature API.
2. Use entity tags plus a `LIST` tag for cached collections.
3. Use generated RTK Query hooks in client components; do not add Axios service wrappers.
4. Use `skip` for queries whose required identifier has not been selected.
