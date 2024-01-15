import { defineStore } from 'pinia'

export const useTicketsStore = defineStore('tickets', {
  state: () => {
    return {
      tickets: []
    }
  },
  getters: {},
  actions: {
    async fetchTickets () {
      try {
        const {
          data,
          error,
          execute
        } =
         await useApiFetch('tickets/', {
           method: 'GET'
         })
        if (error.value?.statusCode === 401) {
          execute()
        }
        if (error.value) {
          throw new Error(error.value.data.message)
        }
        console.log(data.value)
      } catch (error) {
        return error
      }
    }
  }
})
