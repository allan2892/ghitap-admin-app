import { defineStore } from 'pinia'

export const usePatientStore = defineStore('patientStore', {
  state: () => ({
    patients: [],
    error: null,
    selected_patient: null,
    unsubscribe: null,
    search_dialog: false,
    search_queries: {},
    search_results: [],
  }),

  actions: {

  },
})