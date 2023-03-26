<script setup>
import { usePatientStore } from '@/stores/patient.js'

import PatientTable from '@/views/patients/PatientTable.vue'
import SearchPatientDialog from '@/views/patients/SearchPatientDialog.vue'
import AppointmentDrawer from '@/views/appointments/AppointmentDrawer.vue'
import FileDrawer from '@/views/files/FileDrawer.vue'

const patientStore = usePatientStore()
</script>

<template>
  <div>
    <PatientTable />
    <SearchPatientDialog />
    <FileDrawer />
    <AppointmentDrawer />

    <SnackBarError :error="patientStore.error" />
  </div>
</template>

<route lang="yaml">
meta:
  title: Patients
  layout: default
  requiresAuth: true
  icon: tabler-users
</route>