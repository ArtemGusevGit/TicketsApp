<script setup lang="ts">
import { NDrawer, NDrawerContent, NSpace, NIcon, NDropdown } from 'naive-ui'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import VButtonN from './VButtonNaive.vue'
import { ERouteName } from '~/shared/constants/routes'
import { useAuthStore } from '~/stores/auth'
import { useCommonStore } from '~/stores/common'
import { ADMIN_NAV_OPTIONS } from '~/shared/constants/common'
import { useRouter } from '#vue-router'
import ArrowDownIcon from '~/assets/icons/header/arrow-down-icon.svg'

const route = useRoute()
const router = useRouter()
const { width } = useWindowSize()

const authStore = useAuthStore()
const commonStore = useCommonStore()
const { isAuthenticated, user } = storeToRefs(authStore)
const { mobileMenuOpened } = storeToRefs(commonStore)
const routeName = computed(() => route.name as string)

const props = defineProps({
  isShownDrawer: {
    type: Boolean,
    required: true
  },
  navLinks: {
    type: null as any,
    required: true
  }
})

watch(routeName, () => {
  mobileMenuOpened.value = false
})

const handleSelect = (key: string) => {
  router.push({ name: key })
}
</script>

<template>
  <NDrawer
    v-model:show="mobileMenuOpened"
    :width="width < 440 ? width : 310"
    placement="left"
    :z-index="21"
  >
    <NDrawerContent
      :footer-style="{
        display: 'block',
        border: 'none',
        paddingBottom: '2.5rem'
      }"
      :body-content-style="{
        padding: '3.3rem 1.2rem'
      }"
      :header-style="{
        border: 'none',
        padding: '2.56rem 0 0 2.31rem '
      }"
    >
      <NSpace
        class="links-container"
        vertical
        :size="24"
      >
        <NuxtLink
          v-for="(navLink, index) in props.navLinks"
          :key="index"
          class="drawer-nav__link"
          :to="{ name: navLink.name }"
        >
          <NSpace
            :wrap="false"
            align="center"
          >
            <NIcon
              v-if="navLink.icon"
              class="link__icon"
              :component="navLink.icon"
              size="23"
            />
            <span> {{ navLink.text }}</span>
          </NSpace>
        </NuxtLink>
        <NDropdown
          v-if="user?.role === 'admin' && isAuthenticated"
          trigger="click"
          size="huge"
          :options="ADMIN_NAV_OPTIONS"
          placement="bottom-start"
          @select="handleSelect"
        >
          <a
            href="#"
            class="dropdown__links"
            :class="{ active: router.currentRoute.value.name == 'page-admin-slide-builder'}"
          >
            <NSpace
              align="center"
              :size="10"
            >
              <ArrowDownIcon
                class="arrow-icon"
                :class="{ active: router.currentRoute.value.name?.toString().startsWith('page-admin-management')}"
              />
              <span>Управление</span>
            </NSpace>
          </a>
        </NDropdown>
      </NSpace>
      <template #footer>
        <NSpace
          justify="end"
          vertical
          size="large"
        >
          <template v-if="!isAuthenticated">
            <VButtonN
              class="btn"
              @click="$router.push({ name: ERouteName.PAGE_LOGIN })"
            >
              Войти
            </VButtonN>
            <NuxtLink :to="{ name: ERouteName.PAGE_REGISTRATION }">
              <VButtonN
                class="btn"
                type="primary"
              >
                Подать заявку
              </VButtonN>
            </NuxtLink>
          </template>
          <div v-else>
            <div class="user-container">
              <img
                class="user-container__logo"
                src="~/assets/icons/login/user-logo.png"
                alt="user-logo"
              >
              <div>
                <div class="user-name">
                  {{ user?.name }} {{ user?.middle_name }}
                </div>
                <div
                  class="user-email"
                  :title="user?.email"
                >
                  {{ user?.email }}
                </div>
              </div>
            </div>
            <VButtonN
              class="btn"
              @click="authStore.logout"
            >
              Выйти
            </VButtonN>
          </div>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped lang="scss">
.drawer-nav__link {
  color: #111;
  font-size: 1.25rem;
  font-weight: 300;
  transition: $transition-base;

  &:hover,
  &.router-link-active {
    color: $primary;
  }

  &:focus {
    outline: none;
  }
}

.btn {
  width: 100%;
}

:deep(.close-icon:hover rect) {
  fill: $primary;
  transition: $transition-base;
}

.link__icon {
  margin-top: 0.3rem;
}

.user-container {
  align-items: center;
  display: flex;
  margin-bottom: 1.5rem;

  &__logo {
    height: 2.37rem;
    margin-right: 0.5rem;
  }
}

.user-name {
  font-weight: 600;
}

.user-email {
  color: #7a7a7a;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  white-space: nowrap;
  width: 12rem;
}

.links-container {
  // margin-left: 0.5rem;
  padding-top: 2rem;
}

.dropdown__links {
  color: #111;
  font-size: 1.25rem;
  font-weight: 300;
}

.arrow-icon {
  display: flex;
  margin-top: 0.2rem;
}
</style>
