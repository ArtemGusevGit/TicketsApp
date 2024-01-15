<template>
  <h1 class="title">
    <slot />
  </h1>
</template>

<style scoped lang="scss">
.title {
  color: #2A2C2F;
  font-size: 2rem;
  margin: 0;

  @include media-breakpoint-down(xl) {
    font-size: 1.5rem;
  }
}
</style>
