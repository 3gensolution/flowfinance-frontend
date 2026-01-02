## App Template — Architecture & Developer Guide

This repository is a lightweight Next.js + React template organized to separate business logic from presentation. The goals are clarity, scalability, and a predictable pattern for contributors.

Quick summary:
- `src/app` — Next.js pages and application entry points (small, presentational-only pages).
- `src/common` — All business logic (hooks, services, API clients, types, constants, utilities).
- `src/ui` — Presentation layer: assets, reusable components, TDS-inspired modules/blocks/partials/pages.

Prerequisites
- Node.js and npm installed
- Set `NEXT_PUBLIC_BASE_API_URL` in your environment (e.g. `.env.local`).

Basic commands
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Run tests: `npm test` (Jest config exists in the project)

Entry pattern (enforced style)
The `src/app` pages should be minimal wrappers that only import and render the composed page component from the UI layer. Example:

```tsx
import { Home } from "@/ui/pages";

export default function Page() {
	return <Home />;
}
```

This keeps routing and server/client boundaries in `app/` while all UI composition lives in `src/ui/pages`.

Folder responsibilities (detailed)

- `src/app`
	- Next.js route components (`page.tsx`, `layout.tsx`, `providers.tsx`). Keep these files thin; they should only wire up providers, layouts, and import page components from `src/ui/pages`.

- `src/common`
	- `hooks`
		- `api/` — React Query hooks that call `common/services` (e.g. `usePingApi` uses `pingApi`).
		- `state/` — App-level state (Zustand store in `useAppStore`).
		- `utils/` — small helper hooks such as `useSimulateFetch`.
	- `lib`
		- `api-client.ts` — Axios client with request/response interceptors and auth handling. Used by service functions to make HTTP requests.
		- `react-query-client.ts` — Shared `QueryClient` configuration for React Query defaults (retry behavior, stale times, etc.).
	- `services`
		- `api/query` and `api/mutation` — Thin functions that call the API client and return typed responses (e.g. `pingApi`). These are pure functions that map to endpoints.
	- `types`
		- Centralized TypeScript types for API responses, domain models, and app state (e.g. `ApiResponse<T>`, `PingResponse`, `AppState`).
	- `constants`
		- Route specs and resolver helpers (`ROUTES_SPEC`, `resolveRoute`) used by services to build endpoint URLs.
	- `utils`
		- Generic helpers (URL builders, `pxToRem`, `getInitials`, etc.).

Key implementation notes (examples)
- API flow (example): `src/common/hooks/api/query/usePingApi` uses React Query's `useQuery` with `pingApi` from `src/common/services/api/query/pingApi.ts`. `pingApi` obtains an Axios instance via `getApiClient()` and calls `resolveRoute(ROUTES.ping)`.

- Auth & requests: `getApiClient()` reads `sessionStorage.token` and sets an Authorization header on requests. Response interceptors handle `401` by clearing session and redirecting to `/`.

- App state: `useAppStore` is a small Zustand store containing `isAuthenticated`, `user`, and `login`/`logout` actions. Pages and components import this hook to read/update global state.

UI layer and TDS (Ternary Design System) principle
- `src/ui` contains the presentation layer and follows the TDS-inspired organization:
	- `assets/` — Fonts, icons, images, and theme files.
	- `modules/` — Reusable building blocks grouped by responsibility.
		- `components/` — Small, generic, reusable components (buttons, inputs, rows, loaders). Each component contains `ui/` and `common/` subfolders when necessary (styles, hooks, subcomponents).
		- `blocks/` — Mid-level compositions of components forming a meaningful section (e.g., a login form block).
		- `partials/` — Larger sections composed from blocks (e.g., header, footer, content sections).
	- `pages/` — Page compositions that assemble components, blocks and partials into a full page (e.g., `Home`).

Design principle in practice
- Components are the smallest unit and should be fully reusable and style-agnostic when possible.
- Blocks combine several components to form a feature-area; blocks are still reusable but are more opinionated.
- Partials are page-level sections (header, hero, footer) often reused across pages.
- Pages are the final composition used by `src/app` routes.

Concrete example (Home page)
- `src/ui/pages/Home/index.tsx` demonstrates how UI composes logic + presentation:
	- Reads application state from `useAppStore()`.
	- Uses `usePingApi()` to fetch a ping endpoint and displays the result.
	- Uses `AppButton` and layout components from `src/ui/modules/components`.

Where to look first (recommended onboarding)
1. `src/app/page.tsx` — see the minimal entry pattern.
2. `src/ui/pages/Home/index.tsx` — example of composing hooks + UI components.
3. `src/common/lib/api-client.ts` — how HTTP requests and auth interceptors work.
4. `src/common/services/api/query/pingApi.ts` and `src/common/hooks/api/query/usePingApi/index.ts` — typical service → hook flow.
5. `src/ui/modules/components/*` — library of reusable UI primitives.

Environment & notes
- Required env: `NEXT_PUBLIC_BASE_API_URL` — base URL used by the Axios client.
- Tests are configured with Jest (`jest.config.js` / `tests/`).

Maintainers' recommendations
- Keep `src/app` pages thin: only import page components from `src/ui/pages`.
- Keep business logic inside `src/common` (services, hooks, types). Avoid placing fetches or business decisions inside `src/ui` components — keep them focused on presentation.
- Follow the components → blocks → partials → pages layering in `src/ui` as the app grows.

---
Generated: documentation of the project's structure and examples for contributors.
