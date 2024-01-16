<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ERouteName } from '~/shared/routes'
import { useAuthStore } from '~/stores/auth'
import ticketsIcon from '~/assets/icons/tickets-icon.svg'
import profileIcon from '~/assets/icons/profile-icon.svg'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const navLinks = [
  {
    name: ERouteName.PAGE_ADMIN_TICKETS,
    text: 'Тикеты',
    icon: ticketsIcon
  },
  {
    name: ERouteName.PAGE_ADMIN_PROFILE,
    text: 'Профиль',
    icon: profileIcon
  }
]
</script>

<template>
  <div class="app__main">
    <div class="main-nav">
      <div class="main-nav__links">
        <NSpace
          vertical
          align="center"
        >
          <img
            class="user-img"
            :src="user?.avatar"
            alt="userLogo"
          >
          <div>{{ user?.fullName }}</div>
        </NSpace>
        <NuxtLink
          v-for="(link, index) in navLinks"
          :key="index"
          :to="{name: link.name}"
          class="main-nav__link"
        >
          <NSpace align="center">
            <NIcon
              class="icon"
              :component="link.icon"
            />
            <span>
              {{ link.text }}
            </span>
          </NSpace>
        </NuxtLink>
      </div>
      <NButton
        type="primary"
        @click="authStore.logout"
      >
        Выход
      </NButton>
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

.icon {
  display: flex;
}

.user-img {
  border-radius: 100%;
}
</style>
