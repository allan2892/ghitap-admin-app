<script setup>
import { usePatientStore } from '@/stores/patient.js'
import { useAppointmentStore } from '@/stores/appointment.js'

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
})

const patientStore = usePatientStore()
const appointmentStore = useAppointmentStore()

const openAppointment = () => {
  patientStore.selected_patient = Object.assign({}, props.patient)
  appointmentStore.drawer = true
}
</script>

<template>
  <VBtn
    icon
    variant="text"
    color="default"
    size="x-small"
    @click="openAppointment"
  >
    <VIcon
      icon="tabler-calendar"
      :size="22"
    />
  </VBtn>
</template>
