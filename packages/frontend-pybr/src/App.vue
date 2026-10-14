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
import EmptyPage from '@/pages/empty.vue';

const routeMap = {
  empty: EmptyPage,
};

const activeView = computed(() => routeMap[currentRoute.value.component] ?? EmptyPage);
</script>
