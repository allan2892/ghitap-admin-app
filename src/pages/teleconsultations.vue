<script setup>
import { useTeleconsultationStore } from '@/stores/teleconsultation.js'
import TeleconsultationTable from '@/views/teleconsultations/TeleconsultationTable.vue'
import AppointmentDrawer from '@/views/appointments/AppointmentDrawer.vue'
import FileDrawer from '@/views/files/FileDrawer.vue'

const teleconsultationStore = useTeleconsultationStore()
</script>

<template>
  <div>
    <TeleconsultationTable />
    <FileDrawer />
    <AppointmentDrawer />

    <SnackBarError :error="teleconsultationStore.error" />
  </div>
</template>

<route lang="yaml">
meta:
  title: Teleconsultations
  layout: default
  requiresAuth: true
  icon: tabler-phone-call
</route>
