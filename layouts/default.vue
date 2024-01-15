<script setup lang="ts">
import { ERouteName } from '~/shared/routes'
import VButton from '~/components/ui/VButton.vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="app__main">
    <div class="main-nav">
      <div class="main-nav__links">
        <NuxtLink
          class="main-nav__link"
          :to="{name: ERouteName.PAGE_HOME}"
        >
          Тикеты
        </NuxtLink>
        <NuxtLink
          class="main-nav__link"
          :to="{name: ERouteName.PAGE_ADMIN_PROFILE}"
        >
          Профиль
        </NuxtLink>
      </div>
      <VButton
        type="primary"
        @click="authStore.logout"
      >
        Выход
      </VButton>
    </div>

    <div class="main-content">
      <ClientOnly>
        <template #fallback>
          <div class="loader">
            <NSpin />
          </div>
        </template>
        <slot />
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app__main {
  display: grid;
  grid-template-columns: 15rem 1fr;
}

.main-nav {
  padding: 1rem;
  background-color: #eee;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__link {
    color: $dark;
  }
}

.main-content {
  padding: 1rem;
  height: 100vh;
  overflow-y: scroll;
}

.router-link-active {
  color: $primary;
}

.loader {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
