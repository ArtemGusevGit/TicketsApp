<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { ERouteName } from '~/shared/routes'
import VTitle from '~/components/ui/VTitle.vue'
import VSelect from '~/components/ui/VSelect.vue'
import { useAuthStore } from '~/stores/auth'
import { NOTIFICATION_DURATION } from '~/shared/common'
import { CITY_OPTIONS } from '~/shared/const'

definePageMeta({
  name: ERouteName.PAGE_ADMIN_PROFILE,
  middleware: 'auth'
})

const authStore = useAuthStore()
const notification = useNotification()
const router = useRouter()
const { user } = storeToRefs(authStore)
const isLoading = ref(false)
const date = ref(null)
const title = 'Мой профиль'

const isDateChange = computed(() => {
  return !!date.value
})

useHead({
  title
})

const { handleSubmit, meta } = useForm({
  initialValues: {
    city: user.value?.city,
    id: user.value?.id,
    date: null
  },

  validationSchema: yup.object({
    city: yup.string().required('Обязательное поле')

  })
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  const payload = {
    city: values.city as string,
    birthDate: date.value ? date.value : user.value?.birthDate as string
  }
  const userId = values.id
  try {
    await authStore.editUserData(userId as string, payload)
    await authStore.fetchUserData()
    notification.success({
      title: 'Изменения сохранены',
      duration: NOTIFICATION_DURATION
    })
    router.push({ name: ERouteName.PAGE_ADMIN_TICKETS })
  } catch (error) {
    notification.error({
      title: 'Не удалось сохранить изменения',
      duration: NOTIFICATION_DURATION
    })
  }
  isLoading.value = false
})

</script>

<template>
  <VTitle>
    {{ title }}
  </VTitle>
  <NForm @submit="onSubmit">
    <NList>
      <NListItem>ФИО: {{ user?.fullName }}</NListItem>
      <NListItem>
        <NSpace>
          <span>Информация об пользователе:</span>
          <span>{{ user?.userInfo }}</span>
        </NSpace>
      </NListItem>
      <NListItem>
        <NSpace vertical>
          <span>
            Дата рождения: {{ moment(user?.birthDate).format('DD.MM.YYYY') }}
          </span>
          <NDatePicker
            v-model:value="date"
            placeholder="Изменить дату рождения"
            format="dd/MM/yyyy"
          />
        </NSpace>
      </NListItem>
      <NListItem>
        <VSelect
          name="city"
          label="Город"
          :options="CITY_OPTIONS"
        />
      </NListItem>
    </NList>
    <NSpace justify="end">
      <NButton
        type="primary"
        attr-type="submit"
        size="medium"
        :loading="isLoading"
        :disabled="isLoading || !meta.dirty && !isDateChange"
      >
        Изменить
      </NButton>
    </NSpace>
  </NForm>
</template>
