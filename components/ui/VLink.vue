<script setup lang="ts">

type Props = {
  to: string,
}

const props = withDefaults(defineProps<Props>(), {
  to: ''
})

</script>

<template>
  <NuxtLink
    class="link"
    :to="to"
    target="_blank"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped lang="scss">
.link {
  border-bottom: 1px solid $primary;
  color: $primary;
}
</style>
