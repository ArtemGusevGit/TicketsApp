<script setup lang="ts">
import { useField } from 'vee-validate'
import { NInput } from 'naive-ui'

type TInputSizes = 'tiny' | 'small' | 'medium' | 'large'
type TInputTypes = 'password' | 'text'

type Props = {
  name: string
  label?: string
  placeholder?: string
  type?: TInputTypes
  size?: TInputSizes
  rounded?: boolean
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  size: 'large',
  rounded: false,
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
    <NInput
      v-model:value="value"
      :type="type"
      :size="size"
      :placeholder="placeholder"
      :disabled="disabled"
      :status="meta.touched && !meta.valid ? 'error' : 'success'"
    />
    <span class="error-message">{{ errors?.join(', ') }}</span>
    <div
      v-if="$slots.extra"
      class="v-input__extra"
    >
      <slot name="extra" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-input__extra {
  margin-top: 0.25rem;
}

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

  label {
    display: inline-block;
  }
}

.form-field.is-horizontal {
  align-items: center;
  display: flex;

  label {
    display: inline;
    flex-basis: 40%;
    margin-bottom: 0;
  }
}
</style>
