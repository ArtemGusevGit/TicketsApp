<template>
  <div class="auth-layout">
    <ClientOnly>
      <template #fallback>
        <div class="loader">
          <NSpin />
        </div>
      </template>
      <slot />
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  padding: 1.5rem;
  width: 100%;
}
</style>
