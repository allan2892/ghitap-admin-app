<script setup>
import { VForm } from 'vuetify/components'
import {
  emailValidator,
  requiredValidator,
} from '@validators'
import { useUserStore } from "@/stores/user.js"

const userStore = useUserStore()

const refVForm = ref()

const data = reactive({
  email: '',
  password: '',
})

const onSubmit = () => {
  refVForm.value?.validate().then( async ({ valid: isValid }) => {
    if (isValid) {
      // do something
    }
  })
}
</script>

<template>
  <VForm
    ref="refVForm"
    @submit.prevent="onSubmit"
  >
    <VRow>
      <!-- email -->
      <VCol cols="12">
        <VTextField
          v-model="data.email"
          label="Email"
          type="email"
          :disabled="userStore.loading"
          :rules="[requiredValidator, emailValidator]"
        />
      </VCol>

      <!-- password -->
      <VCol cols="12">
        <VTextField
          v-model="data.password"
          label="Password"
          :rules="[requiredValidator]"
          type="password"
          :disabled="userStore.loading"
        />

        <VBtn
          class="mt-4"
          block
          type="submit"
          :loading="userStore.loading"
        >
          Login
        </VBtn>
      </VCol>
    </VRow>
  </VForm>

  <SnackBarError :error="userStore.error" />
</template>
