# Account and auth implementation plan

## Scope

- Implement auth infrastructure in `packages/frontend-pybr/` only.
- No login/signup UI, page content, styling, backend, or main-frontend changes.
- Keep `/login` and `/join` as routes to empty pages.

## Files

- `packages/frontend-pybr/package.json`: add `misskey-js`; add Vitest test script and `vitest` / `happy-dom` test dependencies.
- `packages/frontend-pybr/src/api.ts` (new): typed Misskey API requests; POST JSON to `/api/{endpoint}`; pass auth token as request field `i`; surface API/network errors.
- `packages/frontend-pybr/src/auth.ts`: authenticated account/token state; login-flow requests; signup and availability requests; session restore through `/i`; local logout; persist token/account in pybr-specific local storage.
- `packages/frontend-pybr/src/router.ts`: public `/login`, `/signup`; `requiresAuth` guard capability; guard initial path, `navigate()`, and `popstate`; redirect protected paths to `/login?next=…`; restore safe same-origin destination after login. Keep `/` and `/new` public.
- `packages/frontend-pybr/src/main.ts`: await session restore before mounting and route resolution.
- `packages/frontend-pybr/src/App.vue`: map `login` and `join` route keys to empty pages; map unknown paths to `404`.
- `packages/frontend-pybr/src/auth.test.ts` (new): auth/API/session cases.
- `packages/frontend-pybr/src/router.test.ts` (new): route and redirect cases.
- `pnpm-lock.yaml`: generated dependency lock changes only.

## Contracts

- Login: `POST /signin-flow`; handle `finished` token response and `next` steps (`password`, `captcha`, `totp`, `passkey`) with `misskey-js` request/response types.
- Signup settings: fetch `/meta`; use `disableRegistration`, `emailRequiredForSignup`, and enabled captcha provider/sitekey fields.
- Signup: `POST /signup` with `SignupRequest`; invitation code if registration is disabled; email when required; supplied captcha response fields.
- Signup success: token response establishes session; HTTP 204/email-required response is pending signup and must not authenticate.
- Availability: `POST /username/available`, `POST /email-address/available`.
- Session restore/validation: `POST /i` with stored token; discard stored session on authentication failure.
- Logout: clear local pybr session; no server-side token revocation.

## Tests and checks

- Auth: token passed as `i`; successful login/signup persist session; restore validates `/i`; invalid token clears session; logout clears session; pending email signup does not authenticate; signup payload reflects instance settings.
- Router: public `/`, `/join`, `/login`; synthetic `requiresAuth` route fixture covers protected initial URL, navigation, and browser back/forward; preserve `pathname + search + hash` through login; authenticated navigation; reject unsafe external `next` URLs.
- Do not test empty page rendering.
- Run `pnpm --filter frontend-pybr test`, `pnpm --filter frontend-pybr build`, and `node scripts/check-shipping.mjs`.

## Canonical Misskey references

- Login: `packages/frontend/src/components/MkSignin.vue`; `packages/backend/src/server/api/SigninApiService.ts`.
- Signup: `packages/frontend/src/components/MkSignupDialog.form.vue`; `packages/backend/src/server/api/SignupApiService.ts`.
- Session and token: `packages/frontend/src/accounts.ts`; `packages/frontend/src/i.ts`; `packages/backend/src/server/api/AuthenticateService.ts`.
- Existing route guard: `packages/frontend/src/router.definition.ts`; `packages/frontend/src/lib/nirax.ts`.
- Endpoint registration: `packages/backend/src/server/api/ApiServerService.ts`.
