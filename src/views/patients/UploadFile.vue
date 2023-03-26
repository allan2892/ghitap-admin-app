<script setup>
import { usePatientStore } from '@/stores/patient.js'
import { useFileStore } from '@/stores/file.js'

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
})

const patientStore = usePatientStore()
const fileStore = useFileStore()

const openFileUpload = () => {
  patientStore.selected_patient = Object.assign({}, props.patient)
  fileStore.drawer = true
}
</script>

<template>
  <VBtn
    icon
    variant="text"
    color="default"
    size="x-small"
    @click="openFileUpload"
  >
    <VIcon
      icon="tabler-paperclip"
      :size="22"
    />
  </VBtn>
</template>
