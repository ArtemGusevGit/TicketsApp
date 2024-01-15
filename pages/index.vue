<script lang="ts" setup>
import { useTicketsStore } from '~/stores/tickets'
import { ERouteName } from '~/shared/routes'

definePageMeta({
  name: ERouteName.PAGE_HOME,
  layout: 'auth',
  middleware: 'auth'
})

const ticketsStore = useTicketsStore()

await nextTick(async () => {
  await ticketsStore.fetchTickets()
})
</script>

<template>
  <div>
    This is main page component
  </div>
</template>

<style lang="scss" scoped>

</style>
