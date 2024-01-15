<script setup lang="ts">
import { useField } from 'vee-validate'
import { NInput, NPopover } from 'naive-ui'
// import infoIcon from '~/assets/icons/icon-info.svg'

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
  isHorizontal?: boolean
  maxlength?: string
  minlength?: string
  onlyNumbers?: boolean
  showInfoIcon?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  size: 'large',
  rounded: false,
  disabled: false,
  required: false,
  isHorizontal: true,
  maxlength: '',
  minlength: '',
  onlyNumbers: false,
  showInfoIcon: false,
  readonly: false
})

const { value, meta, errors } = useField<string>(() => props.name)

const onlyAllowNumber = (value: string) => {
  return !value || /^\d+$/.test(value)
}

const allowInputForNumber = computed(() => {
  return props.onlyNumbers ? onlyAllowNumber : undefined
})
</script>

<template>
  <div
    class="form-field"
    :class="[{ 'is-horizontal': isHorizontal }]"
  >
    <label
      :for="name"
      :class="{ required: required, error: meta.touched && !meta.valid }"
    >
      {{ label }}
    </label>
    <NInput
      v-model:value="value"
      :allow-input="allowInputForNumber"
      :maxlength="maxlength"
      :minlength="minlength"
      :type="type"
      :size="size"
      :placeholder="placeholder"
      :disabled="disabled"
      :status="meta.touched && !meta.valid ? 'error' : 'success'"
      :class="['input', { rounded: rounded }]"
    />
    <span class="error-message">{{ errors?.join(', ') }}</span>
    <div
      v-if="$slots.extra"
      class="v-input__extra"
    >
      <slot name="extra" />
    </div>
    <div
      v-if="showInfoIcon"
      :class="{ 'inform-icon': showInfoIcon }"
    >
      <NPopover trigger="hover">
        <template #trigger>
          <!-- <infoIcon /> -->
        </template>
        <span>Для изменения параметра напишите нам на email</span>
      </NPopover>
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

.rounded {
  border-radius: 12px;
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

.inform-icon {
  position: absolute;
  right: -2rem;
  top: 2rem;
  width: 1.5rem;
}
</style>
