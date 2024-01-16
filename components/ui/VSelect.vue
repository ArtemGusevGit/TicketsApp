<script setup lang="ts">
import { useField } from 'vee-validate'
import { NSelect } from 'naive-ui'

type TSizes = 'tiny' | 'small' | 'medium' | 'large'

type Props = {
  name: string
  label?: string
  options?: { label: string; value: string | number }[]
  placeholder?: string
  size?: TSizes
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  options: () => [],
  placeholder: '',
  size: 'large',
  disabled: false,
  required: false
})

const { value, meta, errors } = useField<string>(() => props.name)
</script>

<template>
  <div
    class="form-field"
  >
    <label
      :for="name"
      :class="{ required: required, error: meta.touched && !meta.valid }"
    >
      {{ label }}
    </label>
    <NSelect
      v-model:value="value"
      :size="size"
      :options="options"
      :placeholder="placeholder"
      :disabled="disabled"
      :status="meta.touched && !meta.valid ? 'error' : 'success'"
    />
    <span class="error-message">{{ errors?.toString() }}</span>
  </div>
</template>

<style scoped lang="scss">

.error-message {
  color: #ff3b30;
  font-size: 0.725rem;
}

label {
  display: inline-block;
  font-weight: 300;
  margin-bottom: 0.5rem;
  vertical-align: top;

  &.error {
    color: #d03050;
  }
}

label.required {
  position: relative;

  &::after {
    color: #c1c1c1;
    content: '*';
    margin-left: 0.2rem;
  }
}

.form-field {
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
}

</style>
