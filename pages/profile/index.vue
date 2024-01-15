<script lang="ts" setup>
import { ERouteName } from '~/shared/routes'
definePageMeta({
  name: ERouteName.PAGE_ADMIN_PROFILE,
  middleware: 'auth'
})
</script>

<template>
  <div>
    MyPROFILE!
  </div>
</template>

<style lang="scss" scoped>

</style>
