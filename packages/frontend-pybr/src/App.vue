<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
  <component :is="activeView" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { currentRoute } from '@/router';
import NotFoundPage from '@/pages/404.vue';
import HomePage from '@/pages/home.vue';
import LoginPage from '@/pages/login.vue';
import JoinPage from '@/pages/join.vue';

const routeMap = {
  '404': NotFoundPage,
  home: HomePage,
  login: LoginPage,
  join: JoinPage,
};

const activeView = computed(() => routeMap[currentRoute.value.component] ?? NotFoundPage);
</script>
