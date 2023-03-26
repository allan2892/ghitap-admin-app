<script setup>
import { useAppointmentStore } from '@/stores/appointment.js'

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },
})

const appointmentStore = useAppointmentStore()

const openEdit = () => {
  appointmentStore.drawer = true
  appointmentStore.current_appointment = Object.assign({}, props.appointment)
}
</script>

<template>
  <VBtn
    icon
    size="x-small"
    color="default"
    variant="text"
    @click="openEdit"
  >
    <VIcon
      size="22"
      icon="tabler-edit"
    />
  </VBtn>
</template>
