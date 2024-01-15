<script setup lang="ts">
import { NButton } from 'naive-ui'

type TButtonSize = 'tiny' | 'small' | 'medium' | 'large'
type TRound = 'default' | 'xs-round'

type TEmits = {
  (e: 'click'): void
}

type Props = {
  type?: string
  size?: TButtonSize
  round?: boolean
  disabled?: boolean
  rounded?: TRound
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: '',
  size: 'medium',
  round: false,
  disabled: false,
  rounded: 'default',
  loading: false
})

const emit = defineEmits<TEmits>()

const handleClick = () => emit('click')
</script>

<template>
  <NButton
    :type="type"
    :size="size"
    :round="round"
    :disabled="disabled"
    :class="[rounded]"
    :loading="loading"
    @click="handleClick"
  >
    <slot>Кнопка</slot>
  </NButton>
</template>

<style scoped lang="scss">
.xs-round {
  border-radius: 1rem;
}
</style>
