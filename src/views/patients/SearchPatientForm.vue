<script setup>
import { usePatientStore } from '@/stores/patient.js'

const patientStore = usePatientStore()
</script>

<template>
  <div class="d-flex">
    <VTextField
      v-model="patientStore.search_queries.patlast"
      label="Last Name"
      class="mx-2"
      outlined
    />
    <VTextField
      v-model="patientStore.search_queries.patfirst"
      label="First Name"
      outlined
    />
    <VBtn
      class="mx-2"
      color="primary"
      depressed
    >
      Search
    </VBtn>
  </div>
</template>
