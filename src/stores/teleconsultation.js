import { defineStore } from 'pinia'

export const useTeleconsultationStore = defineStore('teleconsultationStore', {
  state: () => ({
    teleconsultations: [],
    loading: false,
    error: null,
  }),

  actions: {
    startLoading() {
      this.loading = true
      this.error = null
    },
  },
})