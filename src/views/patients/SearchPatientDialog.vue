<script setup>
import { usePatientStore } from '@/stores/patient.js'
import SearchPatientForm from '@/views/patients/SearchPatientForm.vue'
import SearchResults from '@/views/patients/SearchResults.vue'

const patientStore = usePatientStore()

watchEffect(() => {
  if(patientStore.search_dialog && patientStore.selected_patient) {
    patientStore.search_queries.patlast = patientStore.selected_patient.lastName
    patientStore.search_queries.patfirst = patientStore.selected_patient.firstName
  } else {
    patientStore.search_queries.patlast = ''
    patientStore.search_queries.patfirst = ''
  }
})
</script>

<template>
  <VDialog
    v-model="patientStore.search_dialog"
    :width="$vuetify.display.smAndDown ? 'auto' : 750"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="patientStore.search_dialog = false" />

    <VCard>
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 font-weight-medium mb-4">
          Search Patient
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-6">
        <SearchPatientForm />
      </VCardText>

      <VCardText class="pt-6">
        <SearchResults />
      </VCardText>
    </VCard>
  </VDialog>
</template>
