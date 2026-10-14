# Components hierarchy

- `packages/frontend/src/pages/`: route-level views; feature groups use subdirectories such as `settings/`, `admin/`, `chat/`, and `user/`.
- `packages/frontend/src/components/`: shared `Mk*` components; `components/global/` holds app-wide components registered in `components/index.ts`.
- `packages/frontend/src/ui/`: application shells (`universal.vue`, `deck.vue`, `visitor.vue`, `zen.vue`, `minimum.vue`); shared shell elements live in `ui/_common_/`.
- Large UI shared across pages belongs in `components/`; app-wide navigation, status bars, and shell chrome belong in `ui/_common_/`.

# Logic / presentation split

- Page/component templates and local interaction state live in Vue SFCs (`<script setup lang="ts">`).
- Reusable state and behavior belong in composables or domain modules; API access belongs in utilities, not duplicated across templates.
- Existing Misskey examples: `packages/frontend/src/utility/misskey-api.ts`, `packages/frontend/src/accounts.ts`, `packages/frontend/src/i.ts`.
- `frontend-pybr` separates router state (`src/router.ts`), auth state (`src/auth.ts`), theme state (`src/theme.ts`), and presentation (`src/pages/`, `src/App.vue`).
- Keep presentation components focused on rendering and emitting user intent; keep API, persistence, and shared state in TypeScript modules.

# Layout elements

- `MkContainer` — titled, foldable content region: `packages/frontend/src/components/MkContainer.vue`.
- `MkFolder` — collapsible content and optional folder-as-page behavior: `packages/frontend/src/components/MkFolder.vue`.
- `MkStickyContainer` — sticky header/body/footer layout: `packages/frontend/src/components/global/MkStickyContainer.vue`.
- `PageWithHeader` / `PageWithAnimBg` — page wrappers: `packages/frontend/src/components/global/PageWithHeader.vue`, `PageWithAnimBg.vue`.
- `_panel` and `_spacer` are shared utility classes; spacing is controlled with `--MI_SPACER-min` / `--MI_SPACER-max`.
- No standalone `Card` or `Panel` component; use `_panel` or compose `MkContainer` where appropriate.
- `frontend-pybr` currently has global styles in `src/style.scss`; `.empty-page` and `.empty-panel` are shell styles, not reusable layout components.
