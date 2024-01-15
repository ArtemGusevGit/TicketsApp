<script setup lang="ts">
import { ERouteName } from '~/shared/routes'

type Props = {
  to: string | { name: ERouteName; params?: Record<string, string> },
  linkText: string,
}

const props = withDefaults(defineProps<Props>(), {
  to: '',
  linkText: ''
})

</script>

<template>
  <div class="breadcrumb">
    <NuxtLink
      class="breadcrumb__link"
      :to="to"
    >
      {{ linkText }}
    </NuxtLink>
    <span class="breadcrumb__separator">/</span>
    <span class="breadcrumb__text">
      <slot />
    </span>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 1rem;

  @include media-breakpoint-down(xs) {
    margin-bottom: 1.1rem;
    margin-top: 0;
  }
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
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  white-space: nowrap;
}
</style>
