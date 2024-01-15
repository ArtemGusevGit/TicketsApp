<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { ERouteName } from '~/shared/constants/routes'

type Props = {
  breadcrumbLevels: Array<{
    text: string,
    to: string | { name: ERouteName; params?: Record<string, string> },
  }>
}

const { width } = useWindowSize()
const props = defineProps<Props>()

</script>

<template>
  <div class="breadcrumb">
    <NuxtLink
      class="breadcrumb__link"
      :to="breadcrumbLevels[0].to"
    >
      {{ breadcrumbLevels[0].text }}
    </NuxtLink>
    <span class="breadcrumb__separator">/</span>
    <div
      v-if="width >= 650"
      class="links-wrapper"
    >
      <div
        v-for="(level, index) in breadcrumbLevels"
        :key="level.text"
      >
        <NuxtLink
          v-if="index !== 0"
          class="breadcrumb__link"
          :to="level.to"
        >
          {{ level.text }}
        </NuxtLink>
        <span
          v-if="index !== 0"
          class="breadcrumb__separator"
        >/
        </span>
      </div>
    </div>

    <div v-else>
      <span>...</span>
      <span class="breadcrumb__separator">/</span>
    </div>

    <span class="breadcrumb__text">
      <slot>Слот</slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  align-items: center;
  display: flex;
  // flex-wrap: nowrap;
  margin: -1.5rem 0 1.2rem;

  @include media-breakpoint-down(xs) {
    margin-bottom: 1.1rem;
    margin-top: 0;
  }
}

.links-wrapper {
  display: flex;
}

.breadcrumb__link {
  border: 0 solid transparent;
  border-radius: 0.5rem;
  color: #767c82;
  font-size: 0.875rem;
  font-weight: 400;
  padding: 0.2rem 0.5rem;
  text-wrap: nowrap;

  &:hover {
    background-color: #2e333817;
    color: #333639;
  }
}

.breadcrumb__separator {
  color: #767c82;
  margin: 0 1rem;

  @include media-breakpoint-down(xl) {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}

.breadcrumb__text {
  font-size: 0.875rem;
  font-weight: 400;
}
</style>
