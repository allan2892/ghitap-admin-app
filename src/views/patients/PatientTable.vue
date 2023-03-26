<script setup>
import { usePatientStore } from '@/stores/patient.js'
import { avatarText } from '@core/utils/formatters.js'
import StartChat from '@/views/patients/StartChat.vue'
import UploadFile from '@/views/patients/UploadFile.vue'
import CreateAppointment from '@/views/patients/CreateAppointment.vue'
import LinkHospitalNumber from '@/views/patients/LinkHospitalNumber.vue'

const patientStore = usePatientStore()
</script>

<template>
  <VTable class="text-no-wrap">
    <!-- 👉 table head -->
    <thead>
      <tr>
        <th scope="col">
          PATIENT
        </th>
        <th scope="col">
          SEX/BIRTHDATE
        </th>
        <th scope="col">
          CONTACT
        </th>
        <th scope="col">
          ACTION
        </th>
      </tr>
    </thead>

    <!-- 👉 Table Body -->
    <tbody>
      <tr
        v-for="(patient, index) in patientStore.patients"
        :key="index"
        style="height: 3.75rem;"
      >
        <td>
          <div class="d-flex align-center">
            <VAvatar
              variant="tonal"
              color="primary"
              class="me-3"
              size="38"
            >
              {{ avatarText(patient.firstName + ' ' + patient.lastName) }}
            </VAvatar>

            <div class="d-flex flex-column">
              <h6 class="text-base">
                <div class="font-weight-medium user-list-name">
                  {{ patient.firstName + ' ' + patient.lastName }}
                  <VIcon
                    v-if="patient.hpercode"
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
                {{ patient.hpercode ? patient.hpercode : 'No Hospital Number' }}
              </span>
            </div>
          </div>
        </td>

        <td>
          <div
            class="text-capitalize"
            :class="{ 'text-primary': patient.sex == 'Male', 'text-error': patient.sex == 'Female' }"
          >
            {{ patient.sex }}
          </div>

          <div>
            <VIcon
              icon="tabler-calendar-event"
            />
            {{ new Date(patient.birthDate).toDateString() }}
          </div>
        </td>

        <td>
          <div class="d-flex flex-column">
            <div>
              <VIcon
                icon="tabler-phone"
              />
              {{ patient.contact }}
            </div>
            <div>
              <VIcon
                icon="tabler-mail"
              />
              {{ patient.email }}
            </div>
          </div>
        </td>

        <!-- 👉 Actions -->
        <td style="width: 8rem;">
          <LinkHospitalNumber :patient="patient" />
          <StartChat :patient="patient" />
          <UploadFile :patient="patient" />
          <CreateAppointment :patient="patient" />
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<style lang="scss">
.text-capitalize {
  text-transform: capitalize;
}
</style>

