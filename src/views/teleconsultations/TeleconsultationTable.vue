<script setup>
import { useTeleconsultationStore } from '@/stores/teleconsultation.js'
import { usePatientStore } from '@/stores/patient.js'
import { avatarText } from '@core/utils/formatters.js'
import StartChat from '@/views/patients/StartChat.vue'
import UploadFile from '@/views/patients/UploadFile.vue'
import CreateAppointment from '@/views/patients/CreateAppointment.vue'

const teleconsultationStore = useTeleconsultationStore()
const patientStore = usePatientStore()

const getPatient = hpercode => {
  const patient = patientStore.patients.find(patient => patient.hpercode === hpercode)
  
  return patient ? patient : null
}
</script>

<template>
  <VTable class="text-no-wrap">
    <!-- 👉 table head -->
    <thead>
      <tr>
        <th scope="col">
          #QUEUE/TIME
        </th>
        <th scope="col">
          PATIENT
        </th>
        <th scope="col">
          STATUS
        </th>
        <th scope="col">
          SERVICE
        </th>
        <th scope="col">
          ACTION
        </th>
      </tr>
    </thead>

    <!-- 👉 Table Body -->
    <tbody>
      <tr
        v-for="(item, index) in teleconsultationStore.teleconsultations"
        :key="index"
        style="height: 3.75rem;"
      >
        <!-- 👉 Filling -->
        <td>
          <div class="text-primary">
            #{{ item.filling }}
          </div>
          <span>{{ new Date(item.opddate).toLocaleTimeString() }}</span>
        </td>

        <!-- 👉 Patient -->
        <td>
          <div
            v-if="item.patient"
            class="d-flex align-center"
          >
            <VAvatar
              variant="tonal"
              color="primary"
              class="me-3"
              size="38"
            >
              {{ avatarText(item.patient.patfirst + ' ' + item.patient.patlast) }}
            </VAvatar>

            <div class="d-flex flex-column">
              <h6 class="text-base">
                <div class="font-weight-medium user-list-name">
                  {{ item.patient.patlast + ', ' + item.patient.patfirst }}
                  <VIcon
                    v-if="getPatient(item.patient.hpercode)"
                    size="16"
                    color="success"
                    icon="tabler-circle-check-filled"
                  />
                  <VIcon
                    v-else
                    size="16"
                    color="error"
                    icon="tabler-alert-circle-filled"
                  />
                </div>
              </h6>
              <span class="text-sm text-disabled">
                {{ item.patient.hpercode ? item.patient.hpercode : 'No Hospital Number' }}
              </span>
            </div>
          </div>
        </td>

        <!-- 👉 Type -->
        <td>
          <VChip
            label
            :color="item.opdstat == 'A' ? 'success' : 'error'"
            size="small"
            class="text-capitalize"
          >
            {{ item.opdstat == 'A' ? 'Active' : 'Inactive' }}
          </VChip>
        </td>

        <!-- 👉 Service -->
        <td>
          {{ item.service ? item.service.tsdesc : item.tscode }}
        </td>

        <!-- 👉 Actions -->
        <td
          class="text-center"
          style="width: 5rem;"
        >
          <StartChat :patient="item.patient" />
          <UploadFile :patient="item.patient" />
          <CreateAppointment :patient="item.patient" />
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
