import { defineStore } from 'pinia'
import { useCookie } from '#imports'
import { ERouteName } from '~/shared/routes'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: useCookie('accessToken'),
    user: useCookie('user')
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
          const userCookie = useCookie('user') as any

          accessTokenCookie.value = 'AccessToket'
          this.accessToken = 'AccessToket'

          userCookie.value = 'admin'
          this.user = 'admin'
        } else {
          const message = 'Неверный логин или пароль!'
          throw new Error(message)
        }
      } catch (error) {
        return Promise.reject(error)
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
