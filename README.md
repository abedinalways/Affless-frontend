# Waffless — Client & Editor Marketplace (Frontend)

A two-sided marketplace web application where **Clients** post video-editing jobs and
**Editors** browse, bid on and deliver them. The frontend is a single Next.js App Router
application serving three distinct experiences from one codebase:

| Audience | Base path | Description |
| --- | --- | --- |
| Public visitors | `/` | Marketing site, job board, editor/client public profiles, help & legal pages |
| Clients | `/client` | Dashboard, post job, proposals, delivery, payments, messages |
| Editors | `/editor` | Dashboard, browse jobs, proposals, delivery, earnings, messages |
| Admins | `/admin` | Users, jobs, chats, analytics, earnings, platform settings |

> **Docs:** the backend contract this client depends on is documented in
> [`docs/API_INTEGRATION.md`](docs/API_INTEGRATION.md). Read it before adding endpoints.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Directory layout](#directory-layout)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Authentication & session flow](#authentication--session-flow)
- [API layer (RTK Query)](#api-layer-rtk-query)
- [Routing map](#routing-map)
- [Navigation registry & breadcrumbs](#navigation-registry--breadcrumbs)
- [UI, styling & code conventions](#ui-styling--code-conventions)
- [Mock data](#mock-data)
- [Project review — findings & recommendations](#project-review--findings--recommendations)
- [Verified status](#verified-status)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## Tech stack

| Area | Choice | Version |
| --- | --- | --- |
| Framework | Next.js (App Router, Turbopack) | `16.1.6` |
| UI runtime | React / React DOM | `19.2.0` |
| Language | TypeScript (`strict: true`) | `5.9.3` |
| Styling | Tailwind CSS (v4, CSS-first config) | `4.1.17` |
| Component primitives | shadcn/ui (`new-york`, base `neutral`) on Radix UI | `radix-ui 1.4.3` |
| Server state | Redux Toolkit + RTK Query | `2.12.0` |
| Client state | Redux Toolkit slices + React Context | `react-redux 9.3.0` |
| Forms | `react-hook-form` (+ `input-otp` for OTP fields) | `7.66.1` |
| Notifications | `react-hot-toast` | `2.6.0` |
| Tables | `@tanstack/react-table` | `8.21.3` |
| Charts | `apexcharts` + `react-apexcharts` | `5.3.6` |
| Carousels / media | `swiper`, `embla-carousel-react`, `react-player` | — |
| Rich text | `jodit-react` | `5.2.38` |
| Icons | `lucide-react`, `react-icons` | — |
| Cookies / dates / utils | `nookies`, `date-fns`, `lodash`, `uuid`, `clsx`, `tailwind-merge`, `class-variance-authority` | — |
| Tooling | Prettier + `prettier-plugin-tailwindcss` | `3.8.3` |

Versions verified against the installed `node_modules` tree and `package.json`.

---

## Architecture

The app is a **Next.js App Router** project that uses **route groups** to give each
audience its own layout while keeping a single URL space. Files outside `app/` are
organised by responsibility.

### Directory layout

```
app/                  Routing, layouts and page composition (App Router)
components/           Presentational + composite components, grouped by domain
  MainPage/           Public marketing sections, one folder per page section
  ClientDashboard/    Client dashboard sections
  ClientEditor/       Editor dashboard sections
  AdminDashboard/     Legacy admin sections (see review)
  reusable/           Cross-cutting widgets (DataTable, Pagination, Modal, Bids…)
  shared/             Shell chrome (Navbar, headers, Footer, Loading, RootMainLayout)
  ui/                 shadcn/ui primitives (button, dialog, table, select…)
  message/            Chat/messaging widgets (shared by client & editor)
lib/                  Infrastructure: redux store, API slices, helpers, utils
hooks/                Reusable client hooks (useAuth, useJobs, useMessages)
helper/               Route registry, cookie helper, small render helpers
context/              React Context providers (legacy UserContext)
config/               App-wide constants (APP_CONFIG, COOKIE_KEYS)
types/                Shared TypeScript contracts
usersService/         Legacy axios service layer (see review)
docs/                 Integration and contract documentation
public/               Static assets (also holds mock data — see review)
```

### Route groups

| Group | Path | Purpose |
| --- | --- | --- |
| `app/(website)/(main)` | `/`, `/jobs`, `/find-editors`… | Public marketing + job board, wraps children with `ContactUs` + `Footer` |
| `app/(website)/(auth)` | `/login`, `/singup`, `/otp`… | Auth screens with `AuthHeader` and no global chrome |
| `app/(website)/(dashboard)` | `/client/*`, `/editor/*` | Authenticated dashboards; guards live in nested layouts |
| `app/(admin-dashboard)` | `/admin/*` | Admin console with sidebar shell |

Layering of providers and shells:

```
app/layout.tsx                     <html> + Poppins font + <Providers> (Redux)
└─ app/(website)/layout.tsx        UserProvider + RootMainLayout (global Navbar/Toaster)
   ├─ (auth)/layout.tsx            AuthHeader, hides global navbar
   ├─ (main)/layout.tsx            ContactUs + Footer
   └─ (dashboard)/layout.tsx       Cookie-based guard + Loading + Footer
      ├─ (client-dashboard)/client/_components/ClientLayout.tsx   role === "client"
      └─ (editor-dashboard)/editor/_components/EditorLayout.tsx   role === "editor"
```

### State ownership

- **Server state → RTK Query.** All HTTP calls go through the single shared `api`
  instance in `lib/redux/api/apiSlice.ts`. Feature slices are added with
  `api.injectEndpoints` and consumed via generated hooks.
- **Session state → Redux `auth` slice + cookies.** `authSlice` hydrates `user`,
  `accessToken`, `refreshToken` from cookies on the client and writes them back on
  login/refresh/logout (`helper/cookie.helper.ts`, `config/app.config.ts`).
- **Role for shell rendering → `context/UserContext.tsx`.** A thin adapter that reads
  `state.auth.user.role` and exposes it as `user` so `RootMainLayout` can pick the
  right header. Its `setUser` is intentionally a no-op kept for backwards compatibility.

---

## Getting started

### Prerequisites

- **Node.js `>=20.9.0`** (enforced by Next.js 16 — see `node_modules/next/package.json#engines`)
- **npm** (a `package-lock.json` is committed; npm is the reference package manager)
- A running instance of the Waffless backend API

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp env.example .env.local

# 3. Point the client at your backend
#    NEXT_PUBLIC_API_ENDPOINT=http://localhost:3001/api

# 4. Start the dev server (http://localhost:3000)
npm run dev
```

### Environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_ENDPOINT` | Yes | `http://localhost:3001/api` | Base URL for every RTK Query request (`APP_CONFIG.apiUrl`) |
| `NODE_ENV` | No | — | Set automatically by Next.js / npm scripts |

`env.example` is the source of truth; `.env*` files are git-ignored.

### Available scripts

| Script | Command | Notes |
| --- | --- | --- |
| `npm run dev` | `next dev` | Dev server with HMR on port 3000 |
| `npm run build` | `next build` | Production build + type checking |
| `npm start` | `next start` | Serve the production build |

There is currently **no** `lint`, `format`, `typecheck` or `test` script. You can run the
tools directly:

```bash
npx tsc --noEmit                                     # type-check only
npx prettier --write .                               # format (tailwind class sorting enabled)
```

---

## Authentication & session flow

Tokens and the user object are stored in **cookies** (via `nookies`) and mirrored into the
Redux `auth` slice. `COOKIE_KEYS` in `config/app.config.ts` defines the three keys:
`accessToken`, `refreshToken`, `user`.

```
Login          POST /auth/login          → { authorization: { access_token, refresh_token }, type }
                                        → dispatch(setCredentials) → cookies written → redirect by `type`
Register       POST /auth/register       → OTP e-mail sent, email cached in sessionStorage
                                        → redirect /verify-email
Verify email   POST /auth/verify-email   → redirect /login
Refresh        POST /auth/refresh        → automatic, single-flight, on any 401 (see apiSlice)
Logout         POST /auth/logout         → cookies cleared, RTK Query cache reset, redirect /login
Forgot pw      POST /auth/forgot-password → POST /auth/verify-token → POST /auth/reset-password
```

Role-based landing is decided in `hooks/useAuth.ts`:

```ts
ADMIN  → /admin
EDITOR → /editor
else   → /client
```

### Route protection

Protection is currently **client-side and layered** — there is no `middleware.ts`:

1. `app/(website)/(dashboard)/layout.tsx` reads the `accessToken`/`user` cookies directly.
   If either is missing it toasts and redirects to `/singup` or `/login`, preserving the
   original path via `?redirect=`.
2. `ClientLayout` / `EditorLayout` then assert the role from `useUser()` and bounce the
   user to the correct dashboard (or login) if the role does not match.
3. `app/(admin-dashboard)/admin/**` is not guarded at the layout level at all today.

---

## API layer (RTK Query)

Everything goes through one API instance:

| File | Responsibility |
| --- | --- |
| `lib/redux/api/apiSlice.ts` | `fetchBaseQuery` + bearer header injection + 401 re-auth + `tagTypes` |
| `lib/redux/store.ts` | `configureStore` with `api.middleware`, `devTools` in non-prod |
| `lib/redux/rootReducer.ts` | `combineReducers({ auth, [api.reducerPath]: api.reducer })` |
| `lib/redux/hooks.ts` | Typed `useAppDispatch` / `useAppSelector` |

Feature endpoints are injected per domain and live next to their feature:

| Feature | File | Endpoints |
| --- | --- | --- |
| Auth | `lib/redux/features/auth/authApi.ts` | login, register, verify-email, me, logout, forgot-password, verify-token, reset-password |
| Jobs | `lib/redux/features/jobs/jobsApi.ts` | list, detail, create, update, delete |
| Users | `lib/redux/features/users/usersApi.ts` | list, detail, profile update, ban, suspend, unban |
| Messages | `lib/redux/features/messages/messagesApi.ts` | conversations, thread, send, block, mute |
| Client | `lib/redux/features/client/clientApi.ts` | stats, deposit, payment history |
| Editor | `lib/redux/features/editor/editorApi.ts` | stats, availability, withdraw |

**Token refresh (`baseQueryWithReauth`).** On `401` (except for `/auth/refresh` itself) a
single shared `refreshPromise` is created; concurrent 401s wait on the same refresh call,
then the original request is retried once. If refresh fails, the session cookies are
cleared. Current tag types: `Auth`, `Jobs`, `Users`, `Messages`, `Editor`, `Client`.

**Adding an endpoint** (per `docs/API_INTEGRATION.md`): add a
`lib/redux/features/<feature>/<feature>Api.ts` using `api.injectEndpoints`, define request
and response DTOs next to it, use entity + `LIST` tags for cached collections, and consume
the generated hooks in client components. **Do not** add axios service wrappers.

```ts
// lib/redux/features/example/exampleApi.ts
export const exampleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExamples: builder.query<ApiResponse<Example[]>, PaginationParams>({
      query: (params) => ({ url: "/examples", params }),
      providesTags: (result) => [
        { type: "Jobs", id: "LIST" },
        ...(result?.data?.map(({ id }) => ({ type: "Jobs" as const, id })) ?? []),
      ],
    }),
  }),
});
export const { useGetExamplesQuery } = exampleApi;
```

---

## Routing map

92 page routes (App Router `page.tsx`) currently exist. Highlights:

### Public (`(website)/(main)`)

`/` · `/jobs` · `/jobs/[id]` · `/find-editors` · `/editor-profile/[id]` ·
`/client-profile/[id]` · `/pricing` · `/howwork` · `/getting-started` · `/client-guide` ·
`/editor-resource` · `/help-center` · `/frequently-question` · `/success-story` ·
`/success-story/[id]` · `/payment-protection` · `/payment-rules` · `/platform-safety` ·
`/trustseftey` · `/dispute-resoulation` · `/status-page` · `/contactus` ·
`/terms-condition` · `/[...not-found]`

### Auth (`(website)/(auth)`)

`/login` · `/singup` · `/otp` · `/verify-email` · `/forgetpassword` · `/resetPassword`

### Client dashboard (`/client`)

`/client` · `/client/post-job` · `/client/manage-job` · `/client/manage-job/[id]` ·
`/client/job-proposal` · `/client/job-proposal/[id]` · `/client/bids-details/[id]` ·
`/client/find-editor` · `/client/find-editor-match` · `/client/hire-vedio-editor` ·
`/client/delivery` · `/client/review` · `/client/review-confirm` · `/client/profile` ·
`/client/payment-history` · `/client/add-money` · `/client/confirm-deposit` ·
`/client/message` · `/client/message/[id]` · `/client/[...not-found]`

### Editor dashboard (`/editor`)

`/editor` · `/editor/browse-job` · `/editor/browse-job/[id]` · `/editor/myproposal` ·
`/editor/myproposal/[id]` · `/editor/hire-request` · `/editor/hire-request/[id]` ·
`/editor/delivery` · `/editor/extend-delivery` · `/editor/earning` ·
`/editor/withdrow-balance` · `/editor/editor-profile` · `/editor/other-user-profile` ·
`/editor/offer` · `/editor/quick-match-result` · `/editor/job-posting-editor` ·
`/editor/review` · `/editor/inbox` · `/editor/message` · `/editor/message/[id]` ·
`/editor/[...not-found]`

### Admin (`(admin-dashboard)`)

`/admin` · `/admin/analytics` · `/admin/jobs` · `/admin/jobs/[id]` · `/admin/earning` ·
`/admin/usermanagement` · `/admin/usermanagement/client` · `/admin/usermanagement/[id]` ·
`/admin/usermanagement/client/[id]` · `/admin/chats` · `/admin/chats/[id]` ·
`/admin/notification` · `/admin/setting` · `/admin/setting/personal-information` ·
`/admin/setting/personal-info-edit` · `/admin/setting/change-password` ·
`/admin/setting/forget-password` · `/admin/dashboard/setting/about-us` ·
`/admin/dashboard/setting/privacy-policy` · `/admin/dashboard/setting/term-conditions` ·
`/admin/[...not-found]`

### API routes

Only one Route Handler exists — `app/api/editor/availability/route.ts` (`GET`, `POST`),
currently a **mock** (see review).

---

## Navigation registry & breadcrumbs

Rather than hard-coding paths, navigation is described once in
[`helper/routes.ts`](helper/routes.ts) as a `routes` record of
`{ label, href, buildHref? }`. `label` may be a function of route params.

```ts
routes.editorjobdetails                       // { label: "My Job Details", href: "/editor/myproposal/", buildHref }
getRouteHref("editorjobdetails:42")           // "/editor/myproposal/42"
getRouteLabel("editormessagesid:7:Alice")     // "Alice's Direct Messages"
```

`encode`d "source" tokens (`routeKey:param1:param2`, joined with `_`) travel between pages
in the `?source=` query param. `lib/navigation-source.ts` reads/forwards that param and
`lib/source-breadcrumb.ts` expands it into a breadcrumb trail. `components/reusable/BreadCumb.tsx`
renders the result, and `lib/job-status.ts` centralises job status labels and colour classes.

---

## UI, styling & code conventions

- **Tailwind CSS v4, CSS-first.** No `tailwind.config.js`; the theme lives in
  `app/globals.css` via `@theme inline` and CSS custom properties. shadcn variables
  (`--primary`, `--radius`, …) are defined in `:root` / `.dark`.
- **shadcn/ui.** `components.json` is configured for the `new-york` style, base `neutral`,
  `lucide` icons, RSC enabled. Generate new primitives with the shadcn CLI; they land in
  `components/ui/`.
- **Class merging.** Always compose conditional classes through `cn()` from `lib/utils.ts`
  (`clsx` + `tailwind-merge`).
- **Variants.** Use `class-variance-authority` (see `components/ui/button.tsx`) instead of
  ad-hoc conditional class strings.
- **Fonts.** Poppins is loaded twice: via `next/font/google` in `app/layout.tsx`
  (`--font-poppins`) and via `@font-face` pointing at `public/fonts/Poppins-Regular.ttf`.
- **Formatting.** Prettier runs with `prettier-plugin-tailwindcss`, so class order is
  normalised on save/format. Respect the existing sort order.
- **Path alias.** `@/*` maps to the project root (`tsconfig.json#paths`), so imports read
  `@/components/...`, `@/lib/...`, `@/types/...`.
- **Client vs server.** Anything using hooks, Redux, cookies or browser APIs starts with
  `"use client";`. Page files are kept thin and delegate to `components/<Domain>/...`.
- **File layout in `app/`.** Route-private components live in an `_components` (or
  `_component`) folder next to the route, and are not URL-addressable. Tabular/table pages
  typically pair a `page.tsx` with a `<Name>Table.tsx` and a `DataTable`/`TableCard` wrapper.
- **Notifications.** Use the shared `<Toaster />` (rendered in the website shell and admin
  shell) with `react-hot-toast`.
- **Numbers & dates.** Use `formatAmount` / `formatNumber` / `formatFullDate` from
  `lib/utils.ts` instead of inline `Intl` calls.

---

## Mock data

`public/demodata.ts` (~1,060 lines) exports the demo collections used by the not-yet-integrated
screens, e.g. `conversationDirectory`, and is imported by `helper/routes.ts` for label lookup.
It is placed under `public/`, which Next.js serves verbatim and also bundles when imported
from code — see the review below for a recommended relocation.

---

## Project review — findings & recommendations

A full pass over the codebase (structure, build, types, conventions) was performed while
writing this document. Findings are grouped by priority; each names the exact files involved
so they can be ticketed directly.

### Verified status

| Check | Command | Result |
| --- | --- | --- |
| Dependency install | `npm install` | ✅ `EXIT=0` |
| Type check | `tsc -p tsconfig.json --noEmit` (strict) | ✅ `EXIT=0`, **zero errors** |
| Production build | `next build` (Turbopack) | ✅ `EXIT=0`, compiled in ~13s, 93 routes emitted |
| Build warnings | — | ⚠️ only a Node 26 `DEP0205` deprecation from the bundler (not app code) |
| ESLint | — | ❌ no config, no dependency, no script |
| Tests | — | ❌ no runner (Jest/Vitest/Playwright) present |

Also found and **fixed as part of this rewrite**: `README.md` contained a committed,
unresolved merge conflict (`<<<<<<< HEAD` … `>>>>>>> dd177bc`).

### Strengths

- **Coherent information architecture.** Route groups cleanly separate public marketing,
  auth, client, editor and admin concerns, each with its own layout shell.
- **One API transport.** RTK Query is the single client-side transport, with a well-built
  `baseQueryWithReauth`: bearer injection, single-flight token refresh (concurrent 401s share
  one refresh call), retry-once, and session clearing on failure. This is better than typical.
- **Typed Redux.** `useAppDispatch` / `useAppSelector` typed hooks, `RootState`/`AppDispatch`
  exported from the store, `strict` TypeScript that passes clean.
- **Centralised route registry.** `helper/routes.ts` + `lib/source-breadcrumb.ts` give
  param-aware labels/hrefs and a token-based breadcrumb trail instead of scattered literals.
- **Domain constants extracted.** `lib/job-status.ts` and `lib/utils.ts` keep status colours
  and number/date formatting in one place.
- **Consistent UI kit.** shadcn/ui on Radix with `cn()` + CVA, so new screens inherit
  accessible primitives and predictable class merging.
- **Written integration contract.** `docs/API_INTEGRATION.md` documents envelopes,
  pagination, the auth payload shape and the rules for adding resources.

### Priority 1 — correctness, security & UX

1. **`hooks/useAuth.ts` fabricates the user object on login.** `id`, `name`, `created_at`
   and `updated_at` are set to `""`, and `role` is derived from the login response's `type`.
   Nothing ever calls `GET /auth/me` to hydrate the real profile, yet `user.role` drives
   role-based redirects and shell rendering. Any backend payload change breaks routing
   silently. **Fix:** after `setCredentials`, call `refetchUser()` / `useGetCurrentUserQuery`
   and persist the real `User`.
2. **No server-side route protection.** There is no `middleware.ts`; all guarding happens in
   client `useEffect`s (`app/(website)/(dashboard)/layout.tsx`, `ClientLayout.tsx`,
   `EditorLayout.tsx`). Consequences: the dashboard shell renders before the redirect (flash
   of protected UI), an extra round-trip per entry, and the redirect depends on cookies being
   readable client-side. **Fix:** add `middleware.ts` that checks the `accessToken` (and
   optionally a role) cookie and redirects `matcher`-protected prefixes.
3. **`/admin/**` is completely unguarded.** `app/(admin-dashboard)/layout.tsx` renders the
   sidebar and header for anyone. Add an admin check to the same middleware.
4. **Silent dead-end on refresh failure.** `apiSlice` calls `clearClientSession()` on a failed
   refresh but never notifies or redirects, so the user stays on a page that quietly fails
   every request. **Fix:** dispatch an event / redirect to `/login?redirect=…`.
5. **Passwords & OTP are validated only on the client.** `login/page.tsx` enforces an 8–64
   char password with an uppercase/number/symbol regex via `react-hook-form`, but nothing
   shared enforces the same rule at registration. Centralise password policy so login, signup
   and reset agree.

### Priority 2 — dead code, duplication & inconsistency

6. **A legacy axios service layer contradicts the written contract.**
   `docs/API_INTEGRATION.md` states *"do not add Axios service wrappers"*, yet:
   - `lib/Fetch.ts` — axios/fetch abstraction; `axios` is a dependency used **only** here.
   - `usersService/user.service.ts` — calls `/login`, `/me`, `/staffStatus`, `/clientStatus`,
     `/staffData`, `/certificates`, `/invoicePayrollStatus`, `/report/user`; none match the
     documented API (`/auth/login`, …) and several belong to an unrelated staff/timesheet domain.
   - `usersService/user.server.service.ts` — calls `/digitalTimesheet` and `/realtimeShift`;
     unrelated to this product. It also exports the **same symbol name** `UserService` as the
     file above, which makes imports ambiguous.
   - `usersService/editor-availability.service.ts` — duplicates `editorApi`'s availability
     endpoints by hitting the local Next route instead.
   **Fix:** delete `lib/Fetch.ts` and `usersService/*` (retain any genuinely needed call as an
   RTK Query endpoint), then drop the `axios` dependency.

7. **The only API route is a mock.** `app/api/editor/availability/route.ts` returns a hardcoded
   `{ isAvailable: true }`, contains `TODO` comments and `console.log`s. It is not consistent
   with `editorApi`'s `/editor/availability` endpoints — pick one path and delete the other.

8. **Mock data lives in `public/` and is imported by app code.** `public/demodata.ts`
   (~1,060 lines) is bundled via `helper/routes.ts` importing `conversationDirectory`. Files in
   `public/` are served verbatim to browsers, so the whole module is downloadable and it pollutes
   the asset directory. **Fix:** move to e.g. `mocks/demodata.ts` (or `lib/mock/`) and update imports.

9. **Pagination is broken in the shared table.** `components/reusable/DataTable.tsx` renders
   `<Pagination … totalPages={1} />`, so the page control can never advance even when `total`
   exceeds `pageSize`. Derive `totalPages` from `total`/`pageSize`.

10. **Typos are baked into public URLs and filenames** — expensive to change later:
    - Routes: `/trustseftey`, `/dispute-resoulation`, `/singup`, `/withdrow-balance`,
      `/forgetpassword` (inconsistent casing next to `/resetPassword`, `/verify-email`).
    - Files/dirs: `PlatFromSefety/Platfromsefety.tsx`, `ClinetDashboardHeaader.tsx`,
      `components/TermsConditon/`, `AdminDashboard/PassordModal/`, `AdminDashboard/settinng/`.
    - Folder `(auth)/registation/_components/` (sic) is a shared component folder for five
      different `(auth)` routes; `registation` is not a route itself. Rename to reflect shared
      auth components.
    **Fix:** correct these before launch and add redirects from the old paths.

11. **Duplicated component basenames.** Identical names appear in multiple domains —
    `ReportUserModal.tsx` (`components/message` **and** `components/reusable`), `JobDetails.tsx`
    (`components/reusable`, `components/ClientEditor/MyProposal`, admin `_components`),
    `Review.tsx` vs `reviews.tsx`, plus `Messages` / `Sidebar` / `MessageBody` / `MessageLayout`
    across client, editor and admin chat folders. Some are legitimate per-role variants; several
    are near-copies. Consolidate the shared ones into `components/message` / `components/reusable`
    and delete the rest.

12. **Two generations of admin UI coexist.** `components/AdminDashboard/**` (older) overlaps with
    `app/(admin-dashboard)/admin/_components/**` (newer, route-colocated). Decide on one and migrate.

### Priority 3 — developer experience & hygiene

13. **Placeholder metadata.** `app/layout.tsx` still ships `title: "Editor Marketplace"` and
    `description: "Generated by create next app"`. The product is *Waffless*; set real metadata
    (and per-route `metadata` where useful).
14. **`package.json` name is `"affless"`** (missing the leading **W**). There is no `engines`
    field, and no `lint` / `format` / `typecheck` script despite Prettier and TypeScript being
    installed.
15. **62 `console.log` calls** remain in application code — including a debug log on every
    breadcrumb render (`lib/source-breadcrumb.ts`) and logging of credential-shaped objects in
    `components/AdminDashboard/PassordModal/page.tsx`. Remove or route through a logger.
16. **30 uses of `h-screen`.** On mobile browsers `100vh` produces a jumping viewport; prefer
    `min-h-dvh` / `h-dvh`.
17. **`z-49` is not a valid Tailwind utility** (`components/shared/RootMainLayout.tsx`); it needs
    `z-[49]` in Tailwind v4. The same component also hides the public navbar by exact-pathname
    matching, so nested auth routes still render it — switch to `pathname.startsWith(...)`.
18. **Unused dependencies:** `react-router` and `react-router-dom` are in `dependencies` but
    never imported — the app uses the Next.js App Router. Remove them.
19. **Types are duplicated across two homes.** `Job` is defined in
    `lib/redux/features/jobs/jobsApi.ts` *and* re-exported from `types/job.types.ts`; `Message` /
    `Conversation` / `InboxItem` live in both `app/type.ts` and `types/message.types.ts`.
    Consolidate on `types/` and delete `app/type.ts`, or vice-versa — not both.
20. **Legacy no-ops retained.** `context/UserContext.tsx` exposes a `setUser` that does nothing;
    `usersService/user.service.ts` carries commented-out `userToken` reads. Delete dead surface.
21. **`next.config.ts` pins a developer LAN host** (`http://192.168.7.54:4050`) in
    `images.remotePatterns`. Make it environment-driven so production images don't depend on it.
22. **No `loading.tsx` / `error.tsx` boundaries.** Only `not-found.tsx` files exist. Add route-group
    level `loading.tsx` and `error.tsx` so slow/failed segments degrade gracefully (the shared
    `components/shared/Loading.tsx` is already available for reuse).
23. **Inconsistent admin settings nesting.** Platform documents live at
    `/admin/dashboard/setting/about-us|privacy-policy|term-conditions` inside the redundant
    `(admin)` group, while the rest of admin settings are at `/admin/setting/*`. Flatten.

---

## Roadmap

Suggested order of work, highest leverage first:

1. Server-side auth via `middleware.ts` for `/client`, `/editor`, `/admin`, plus
   redirect-on-refresh-failure.
2. Hydrate the real user from `GET /auth/me` after login and drop the fabricated `User`.
3. Delete `lib/Fetch.ts`, `usersService/**` and the `axios` dependency; fold anything needed
   into RTK Query.
4. Fix `DataTable` pagination and add API-backed pagination to list screens.
5. Move `public/demodata.ts` out of `public/` and progressively replace it with real endpoints.
6. Add ESLint (`eslint-config-next`), `lint`/`typecheck`/`format` scripts, and CI running
   `tsc --noEmit` + `next build`.
7. Add a test runner (Vitest + React Testing Library, Playwright for e2e), starting with
   `apiSlice` re-auth, `authSlice`, `helper/routes.ts` and `useAuth`.
8. Rename the misspelled routes/files, add redirects, and consolidate duplicated components
   and types.
9. Replace the mock availability route and retire the legacy admin component set.

---

## Contributing

1. Branch off `main` (`feat/<topic>`, `fix/<topic>`).
2. Keep new server calls inside `lib/redux/features/**` (RTK Query) — no ad-hoc axios/fetch wrappers.
3. Reuse `components/ui/**` primitives and merge classes with `cn()`.
4. Run `npx prettier --write .` and `npx tsc --noEmit` before pushing; ensure `next build` passes.
5. Add new navigation entries to `helper/routes.ts` instead of hard-coding hrefs in components.
6. Before adding an endpoint, confirm the payload against [`docs/API_INTEGRATION.md`](docs/API_INTEGRATION.md).

---

## License

No license file is present in this repository. Treat the code as proprietary to the project
owner until a `LICENSE` file is added.

