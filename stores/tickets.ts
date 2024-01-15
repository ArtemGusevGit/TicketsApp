import { defineStore } from 'pinia'
import moment from 'moment'
import type { TTickets } from '@/types/tickets'

export const useTicketsStore = defineStore('tickets', {
  state: () => {
    return {
      tikets: [] as TTickets[],
      tiket: {} as TTickets
    }
  },
  getters: {
    tiketsSerialized: state =>
      state.tikets.map((ticket: TTickets) => ({
        createdAt: moment(ticket.createdAt).format('DD.MM.YYYY'),
        id: ticket.id,
        ticket: ticket.ticket.slice(0, 100) + '...',
        header: ticket.header,
        avatar: ticket.avatar
      })),
    tiketSerialized: (state) => {
      return {
        createdAt: moment(state.tiket.createdAt).format('DD.MM.YYYY'),
        id: state.tiket.id,
        ticket: state.tiket.ticket,
        header: state.tiket.header,
        avatar: state.tiket.avatar
      }
    }

  },
  actions: {
    async fetchTickets () {
      try {
        const {
          data,
          error,
          execute
        } =
        await useApiFetch('my_tickets/', {
          method: 'GET'
        })
        if (error.value?.statusCode === 401) {
          execute()
        }
        if (error.value) {
          throw new Error(error.value.data.message)
        }
        this.tikets = data.value
      } catch (error) {
        return error
      }
    },
    async fetchTicketById (id:string) {
      try {
        const {
          data,
          error,
          execute
        } =
        await useApiFetch(`my_tickets/${id}`, {
          method: 'GET'
        })
        if (error.value?.statusCode === 401) {
          execute()
        }
        if (error.value) {
          throw new Error(error.value.data.message)
        }
        this.tiket = data.value
      } catch (error) {
        return error
      }
    }
  }
})
