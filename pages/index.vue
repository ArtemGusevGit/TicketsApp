<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ERouteName } from '~/shared/routes'

definePageMeta({
  name: ERouteName.PAGE_HOME,
  middleware: 'auth'
})
const router = useRouter()
router.push({ name: ERouteName.PAGE_ADMIN_TICKETS })

</script>

<template>
  <div />
</template>
