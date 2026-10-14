/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { computed, ref } from 'vue';
import { authState } from '@/auth';

export type RouteDefinition = {
  path: string;
  component: string;
  requiresAuth?: boolean;
};

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: 'empty',
  },
  {
    path: '/new',
    component: 'empty',
  },
  {
    path: '/login',
    component: 'empty',
  },
];

export function resolveRoute(path: string) {
  const normalized = path === '/' ? '/' : path.split('?')[0];
  return routes.find(route => route.path === normalized) ?? {
    path: '/404',
    component: 'empty',
  };
}

export const currentPath = ref(window.location.pathname);

export function navigate(path: string) {
  const nextRoute = resolveRoute(path);

  if (nextRoute.requiresAuth && !authState.value.isAuthenticated) {
    window.history.pushState({}, '', '/login');
    currentPath.value = '/login';
    return;
  }

  window.history.pushState({}, '', path);
  currentPath.value = window.location.pathname;
}

export const currentRoute = computed(() => resolveRoute(currentPath.value));

window.addEventListener('popstate', () => {
  currentPath.value = window.location.pathname;
});
