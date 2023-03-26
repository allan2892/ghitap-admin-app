<script setup>
import { usePatientStore } from '@/stores/patient.js'

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
})

const patientStore = usePatientStore()

const openSearch = async () => {
  patientStore.selected_patient = Object.assign({}, props.patient)
  patientStore.search_dialog = true
}
</script>

<template>
  <VBtn
    icon
    variant="text"
    color="default"
    size="x-small"
    @click="openSearch"
  >
    <VIcon
      icon="tabler-id"
      :size="22"
    />
  </VBtn>
</template>