/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { createApp } from 'vue';
import App from '@/App.vue';
import '@/style.scss';
import { initTheme } from '@/theme';
import { currentPath } from '@/router';

initTheme();

const app = createApp(App);
app.mount('#app');

if (window.location.pathname === '/') {
  currentPath.value = '/';
}
