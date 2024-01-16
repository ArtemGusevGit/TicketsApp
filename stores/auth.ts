import { defineStore } from 'pinia'
import { ERouteName } from '~/shared/routes'
import type { TUser } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: useCookie('accessToken'),
    user: useCookie<null | TUser>('user')
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.accessToken
    }
  },

  actions: {
    login (payload: { name: string; password: string }) {
      try {
        if (payload.name === 'admin' && payload.password === 'admin') {
          const accessTokenCookie = useCookie('accessToken') as any

          accessTokenCookie.value = 'AccessToket'
          this.accessToken = 'AccessToket'
        } else {
          const message = 'Неверный логин или пароль!'
          throw new Error(message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async fetchUserData () {
      try {
        const {
          data,
          error
        } =
        await useApiFetch('my_profile/', {
          method: 'GET'
        })

        const userCookie = useCookie('user') as any

        userCookie.value = data.value[0]
        this.user = data.value[0]

        if (error.value) {
          throw new Error(error.value.data.message)
        }
      } catch (error) {
        return error
      }
    },

    async editUserData (id: string, payload: {city:string, birthDate: string|null}) {
      try {
        const { error } = await useApiFetch(`my_profile/${id}`, {
          method: 'PUT',
          body: payload
        })

        if (error.value) {
          throw new Error(error.value.data.message)
        }
      } catch (error) {
        return error
      }
    },

    logout () {
      const accessTokenCookie = useCookie('accessToken')
      const userCookie = useCookie('user')
      const router = useRouter()

      this.accessToken = null
      this.user = null

      accessTokenCookie.value = null
      userCookie.value = null

      router.push({ name: ERouteName.PAGE_LOGIN })
    }
  }
})
