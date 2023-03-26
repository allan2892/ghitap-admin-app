import { defineStore } from 'pinia'
import { emailValidator, requiredValidator } from '@validators'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userLabels: [
      {
        text: 'First Name',
        value: 'firstName',
        type: 'text',
        rules: [requiredValidator],
      },
      {
        text: 'Last Name',
        value: 'lastName',
        type: 'text',
        rules: [requiredValidator],
      },
      {
        text: 'Email Address',
        value: 'email',
        type: 'text',
        rules: [requiredValidator, emailValidator],
      },
    ],

    loading: false,
    error: null,
    user: null,
  }),

  actions: {
    startLoading() {
      this.loading = true
      this.error = null
    },
  },
})
