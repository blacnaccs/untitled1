# Frontend architecture

## Frameworks and tools

- Vue 3 Composition API; TypeScript; Vue SFC
- Vite dev server; Rolldown production build
- SCSS Modules; CSS custom properties for themes
- Nirax client-side router; route components lazy-loaded
- Vitest unit tests; Playwright browser/E2E tests; Storybook
- `misskey-js` typed API client and entity definitions

## Directory structure and modules

- [components](../packages/frontend/src/components/index.ts): reusable UI components; `Mk*` naming; adjacent stories
- [pages](../packages/frontend/src/pages/timeline.vue): route-level views; nested feature directories
- [UI shells](../packages/frontend/src/ui/universal.vue): application shells and shared chrome
- [widgets](../packages/frontend/src/widgets/index.ts): dashboard/deck widgets
- [composables](../packages/frontend/src/composables/use-note.ts): reusable Vue state and lifecycle logic
- [utilities](../packages/frontend/src/utility/misskey-api.ts): feature utilities
- [frontend libraries](../packages/frontend/src/lib/nirax.ts): frontend-specific libraries
- [bootstrap](../packages/frontend/src/boot/common.ts): shared, full-app, and minimal-app bootstrap
- [preferences](../packages/frontend/src/preferences/def.ts): preference definitions and persistence
- Core modules: [entry](../packages/frontend/src/_boot_.ts), [account state](../packages/frontend/src/i.ts), [router](../packages/frontend/src/router.ts), [stream](../packages/frontend/src/stream.ts)
- Shared browser modules: [frontend-shared](../packages/frontend-shared/package.json)
- Locale/build helpers: [frontend-builder](../packages/frontend-builder/package.json)

## Startup and loading

- Entry: [src/_boot_.ts](../packages/frontend/src/_boot_.ts)
- Global stylesheet loaded before bootstrap: [src/style.scss](../packages/frontend/src/style.scss)
- `/share`, `/auth`, `/miauth`, `/oauth`, `/signup-complete`, `/verify-email`, `/install-extensions` → `subBoot()` / `UiMinimum`
- Other paths → `mainBoot()` / configured UI shell (`universal`, `deck`, `zen`, `visitor`)
- Both paths run [src/boot/common.ts](../packages/frontend/src/boot/common.ts): locale, store, instance/account, theme, components, telemetry, plugins
- Mount target: `#misskey_app`; created by bootstrap if absent
- Main router: [src/router.ts](../packages/frontend/src/router.ts) + [src/router.definition.ts](../packages/frontend/src/router.definition.ts)
- Route view imports: async; [loading view](../packages/frontend/src/pages/_loading_.vue) and [error view](../packages/frontend/src/pages/_error_.vue)
- Production output: [Vite manifest](../built/_frontend_vite_/manifest.json); locale bundles inlined after Vite build
- Dependency injection: [src/di.ts](../packages/frontend/src/di.ts) Vue `provide`/`inject` keys

## Account State and Auth and Routing

- Current account: [`$i`](../packages/frontend/src/i.ts); token from local storage; refresh/login via [accounts](../packages/frontend/src/accounts.ts)
- Multi-account tokens and metadata: [accounts](../packages/frontend/src/accounts.ts) + [store](../packages/frontend/src/store.ts) + [preferences](../packages/frontend/src/preferences.ts)
- HTTP authentication: [API helper](../packages/frontend/src/utility/misskey-api.ts) adds current token as `i`
- Routing: [Nirax router](../packages/frontend/src/router.ts); route table and login guards in [router definitions](../packages/frontend/src/router.definition.ts)
- Navigation: History API `pushState` / `replaceState`; `popstate` updates route
- Route pages: asynchronous Vue components; login-required routes declared in route definitions

## Realtime && State propagation

- Realtime: [stream](../packages/frontend/src/stream.ts) → singleton `misskey-js` WebSocket; token when signed in; visibility-aware heartbeat
- Central state: [Pizzax store](../packages/frontend/src/store.ts); device/account/device-account storage scopes
- Preferences: [PreferencesManager](../packages/frontend/src/preferences.ts); local persistence, optional cloud backup, `BroadcastChannel` tab sync
- Store cross-tab synchronization: TODO in [store](../packages/frontend/src/store.ts)
- Local persistence adapter: [local storage](../packages/frontend/src/local-storage.ts)
- Service worker registration: [initializeSw()](../packages/frontend/src/utility/initialize-sw.ts) registers `/sw.js`, sends locale on readiness
- Service worker: [packages/sw/src/sw.ts](../packages/sw/src/sw.ts); offline navigation fallback and push-notification handling

