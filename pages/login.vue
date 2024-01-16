<script setup lang="ts">
import { Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { definePageMeta } from '#imports'
import VInput from '~/components/ui/VInput.vue'
import { useAuthStore } from '~/stores/auth'
import { ERouteName } from '~/shared/routes'
import { NOTIFICATION_DURATION } from '~/shared/common'
import { nameValidations } from '~/shared/validations'

definePageMeta({
  name: ERouteName.PAGE_LOGIN,
  layout: 'auth'
})

const router = useRouter()
const authStore = useAuthStore()

const { isAuthenticated } = storeToRefs(authStore)
const isSubmitting = ref(false)

const title = 'Вход в личный кабинет'
const notification = useNotification()

useHead({
  title
})

nextTick(() => {
  if (isAuthenticated.value) {
    router.push({
      name: ERouteName.PAGE_HOME
    })
  }
})

const schema = yup.object({
  name: nameValidations,
  password: yup.string().required('Обязательное поле')
})

// @ts-ignore
const onSubmit = async (values, { resetForm }) => {
  isSubmitting.value = true
  const { name, password } = values
  try {
    const payload = {
      name,
      password
    }
    await authStore.login(payload)
    await authStore.fetchUserData()
    await router.push({
      name: ERouteName.PAGE_HOME
    })
    notification.success({
      title: 'Успешно!',
      duration: NOTIFICATION_DURATION
    })
    resetForm()
  } catch (error: any) {
    notification.error({
      title: error?.message,
      duration: NOTIFICATION_DURATION
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <VeeForm
    v-slot="{ handleSubmit }"
    :validation-schema="schema"
    as="div"
    class="auth-login"
  >
    <NForm @submit="handleSubmit($event, onSubmit)">
      <div class="form-fields">
        <VInput
          size="medium"
          name="name"
          label="Имя"
          required
          :is-horizontal="false"
        />
        <VInput
          name="password"
          size="medium"
          label="Пароль"
          type="password"
          required
          :is-horizontal="false"
        />
      </div>
      <div class="actions">
        <NButton
          type="primary"
          attr-type="submit"
          size="medium"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          Войти
        </NButton>
      </div>
    </NForm>
  </VeeForm>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}
</style>
