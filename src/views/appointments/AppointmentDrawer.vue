<script setup>
import { useAppointmentStore } from '@/stores/appointment.js'
import { usePatientStore } from '@/stores/patient.js'
import { useServiceStore } from '@/stores/service.js'
import FormDrawer from '@core/components/FormDrawer.vue'

const appointmentStore = useAppointmentStore()
const serviceStore = useServiceStore()

const isEditing = computed(() => {
  return appointmentStore.current_appointment.uid ? true : false
})

watchEffect(() => {
  if (appointmentStore.drawer.value === false) {
    appointmentStore.current_appointment = {
      date: '',
      time: '',
      type: '',
      description: '',
    }
  }
})

const onSubmit = async data => {
  // do something
}

const computedLabels = computed(() => {
  return [{
    text: 'Service',
    value: 'tscode',
    type: 'select',
    rules: [],
    items: serviceStore.serviceOptions,
    noEdit: false,
  }, ...appointmentStore.appointmentLabels]
})
</script>

<template>
  <div>
    <FormDrawer
      v-model:drawer="appointmentStore.drawer"
      :title="isEditing ? 'Edit' : 'New' + ' Appointment'"
      :input="appointmentStore.current_appointment"
      :labels="computedLabels"
      :loading="appointmentStore.loading"
      :is-editing="isEditing"
      @submit="onSubmit"
    />
  </div>
</template>
