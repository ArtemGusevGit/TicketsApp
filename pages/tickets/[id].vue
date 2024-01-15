<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ERouteName } from '~/shared/routes'
import { useTicketsStore } from '~/stores/tickets'
import VTitle from '~/components/ui/VTitle.vue'
import VBreadcrumb from '~/components/ui/VBreadcrumb.vue'

definePageMeta({
  name: ERouteName.PAGE_ADMIN_TICKET_ID,
  middleware: 'auth'
})

const router = useRouter()
const ticketStore = useTicketsStore()
const { tiketSerialized } = storeToRefs(ticketStore)

nextTick(async () => {
  const { id: ticketId } = router.currentRoute.value.params
  await ticketStore.fetchTicketById(ticketId as string)
})
</script>

<template>
  <VBreadcrumb
    :to="{name:ERouteName.PAGE_HOME}"
    link-text="Тикеты"
  >
    {{ tiketSerialized?.header }}
  </VBreadcrumb>
  <VTitle>Тикет:</VTitle>
  <NSpace vertical>
    <NSpace align="center">
      <img
        class="avatar-img"
        :src="tiketSerialized?.avatar"
        alt="avatar"
      >
      <VTitle>{{ tiketSerialized?.header }}</VTitle>
    </NSpace>

    <div>{{ tiketSerialized?.ticket }}</div>
    <NSpace justify="space-between">
      <div>id: {{ tiketSerialized?.id }}</div>
      <div>{{ tiketSerialized?.createdAt }}</div>
    </NSpace>
  </NSpace>
</template>

<style lang="scss" scoped>
.avatar-img {
  border-radius: 100%;
}
</style>
