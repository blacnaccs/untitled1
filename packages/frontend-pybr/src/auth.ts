/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { ref } from 'vue';

export const authState = ref({
  isAuthenticated: false,
});

export function login() {
  authState.value.isAuthenticated = true;
}

export function logout() {
  authState.value.isAuthenticated = false;
}
