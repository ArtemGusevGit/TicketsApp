import { storeToRefs } from 'pinia'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useAuthStore } from '~/stores/auth'
import { ERouteName } from '~/shared/routes'

export default defineNuxtRouteMiddleware(() => {
  const store = useAuthStore()
  const { isAuthenticated } = storeToRefs(store)

  if (!isAuthenticated.value) {
    return navigateTo({ name: ERouteName.PAGE_LOGIN })
  }
})
