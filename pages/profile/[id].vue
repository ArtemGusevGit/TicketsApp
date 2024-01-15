<script lang="ts" setup>
import { ERouteName } from '~/shared/routes'
import VBreadcrumb from '~/components/ui/VBreadcrumb.vue'
import VTitle from '~/components/ui/VTitle.vue'

definePageMeta({
  name: ERouteName.PAGE_ADMIN_PROFILE_ID,
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
    {{ tiketSerialized?.fullName }}
  </VBreadcrumb>
  <NSpace vertical>
    <img
      class="avatar-img"
      :src="tiketSerialized.avatar"
      alt="avatar"
    >
    <VTitle>{{ tiketSerialized?.fullName }}</VTitle>
  </NSpace>
</template>

<style lang="scss" scoped>
.avatar-img {
  border-radius: 100%;
}
</style>
