<script setup lang="ts">
import {
  NConfigProvider,
  NNotificationProvider
} from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#67A8E4',
    primaryColorHover: '#5286b6',
    primaryColorPressed: '#94c2ec'
  }
}
</script>

<template>
  <naive-config>
    <NConfigProvider :theme-overrides="themeOverrides">
      <NNotificationProvider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </NNotificationProvider>
    </NConfigProvider>
  </naive-config>
</template>
