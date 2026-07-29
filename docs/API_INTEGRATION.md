# API integration contract

The frontend uses RTK Query as its only client-side API transport. New endpoints belong in `lib/redux/features/<feature>/<feature>Api.ts` and must be injected into the shared `api` instance.

## Required backend conventions

- Base URL: `NEXT_PUBLIC_API_ENDPOINT`, for example `https://api.example.com/api`.
- Success envelope: `{ success: true, message?: string, data?: T, meta_data?: { total, page, limit, next_cursor? } }`.
- Error envelope: `{ success: false, message: string, statusCode: number, errors?: Record<string, string[]> }`.
- Access token: return it in `authorization.access_token` on login/refresh. Return a rotated `authorization.refresh_token` when applicable.
- Pagination: accept `page`, `limit`, `search`, and optionally `cursor` as query parameters.
- File upload: endpoint bodies use `FormData`; do not manually set `Content-Type` for multipart requests.

## Auth endpoints expected by the frontend

### Login response format
The backend must return tokens inside an `authorization` object (not inside `data`):

```jsonc
{
  "success": true,
  "message": "Logged in successfully",
  "authorization": {
    "type": "bearer",
    "access_token": "eyJ...",
    "refresh_token": "eyJ..."
  },
  "type": "CLIENT"  // or "EDITOR" or "ADMIN"
}
```

### Endpoint list

- `POST /auth/login` — `{ email, password }` → see format above
- `POST /auth/register` — `{ name, email, password, type: "CLIENT" | "EDITOR" }` → returns `{ success: true, message: "We have sent an OTP code to your email" }`
- `POST /auth/verify-email` — `{ email, token }` → returns `{ success: true, message: "Email verified successfully" }`
- `POST /auth/refresh` — `{ refreshToken }` → returns same `{ authorization: { access_token, refresh_token } }` envelope
- `GET /auth/me`
- `POST /auth/logout`
- `POST /auth/forgot-password` — `{ email }`
- `POST /auth/verify-otp` — `{ email, otp }`, returns `{ token }`
- `POST /auth/reset-password` — `{ token, password }`

> **Registration flow**: The frontend implements a two-step registration: (1) `POST /auth/register` sends OTP to email, (2) user is redirected to `/verify-email` where they enter the OTP via `POST /auth/verify-email`. After successful verification, the user is redirected to `/login`.

> **Token refresh**: The `apiSlice` uses the same `{ authorization: { access_token, refresh_token } }` envelope for the refresh endpoint.

`apiSlice` retries a failed request once after a shared refresh operation. A simultaneous batch of 401 responses produces one refresh request, not one per request.

## Adding a resource

1. Define request and response DTOs next to the feature API.
2. Use entity tags plus a `LIST` tag for cached collections.
3. Use generated RTK Query hooks in client components; do not add Axios service wrappers.
4. Use `skip` for queries whose required identifier has not been selected.