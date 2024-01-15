<script setup lang="ts">
import {
  NConfigProvider,
  NNotificationProvider,
  NDialogProvider,
  NMessageProvider
} from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#67A8E4'
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
