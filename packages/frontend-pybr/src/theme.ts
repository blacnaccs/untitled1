/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { ref } from 'vue';

export type ThemeMode = 'light' | 'dark';

export const themeMode = ref<ThemeMode>((window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

export function applyTheme(mode: ThemeMode) {
  themeMode.value = mode;
  document.documentElement.dataset.theme = mode;
  document.documentElement.style.setProperty('color-scheme', mode);
}

export function toggleTheme() {
  applyTheme(themeMode.value === 'dark' ? 'light' : 'dark');
}

export function initTheme() {
  const saved = localStorage.getItem('pybr-theme') as ThemeMode | null;
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
    return;
  }

  applyTheme(themeMode.value);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!localStorage.getItem('pybr-theme')) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
}

export function persistTheme(mode: ThemeMode) {
  localStorage.setItem('pybr-theme', mode);
  applyTheme(mode);
}
