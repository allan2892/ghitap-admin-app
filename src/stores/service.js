import { defineStore } from 'pinia'

export const useServiceStore = defineStore('serviceStore', {
  state: () => ({
    services: [],
  }),

  getters: {
    serviceOptions() {
      return this.services.map(service => {
        return {
          title: service.tsdesc,
          value: service.tscode,
        }
      })
    },
  },

  actions: {
    
  },
})
