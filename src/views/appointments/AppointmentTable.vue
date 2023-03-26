<script setup>
import EditAppointment from '@/views/appointments/EditAppointment.vue'
import DeleteAppointment from '@/views/appointments/DeleteAppointment.vue'
import CreateEncounter from '@/views/appointments/CreateEncounter.vue'
import { useAppointmentStore } from '@/stores/appointment.js'
import { useServiceStore } from '@/stores/service.js'
import { avatarText } from '@core/utils/formatters.js'

const appointmentStore = useAppointmentStore()
const serviceStore = useServiceStore()

const getServiceName = tscode => {
  const service = serviceStore.services.find(service => service.tscode == tscode)
  
  return service ? service.tsdesc : 'No Service'
}
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
          SCHEDULE
        </th>
        <th scope="col">
          SERVICE/TYPE
        </th>
        <th scope="col">
          STATUS
        </th>
        <th scope="col">
          ACTION
        </th>
      </tr>
    </thead>

    <!-- 👉 Table Body -->
    <tbody>
      <tr
        v-for="(appointment, index) in appointmentStore.appointments"
        :key="index"
        style="height: 3.75rem;"
      >
        <!-- 👉 Patient -->
        <td>
          <div
            v-if="appointment.patient"
            class="d-flex align-center"
          >
            <VAvatar
              variant="tonal"
              color="primary"
              class="me-3"
              size="38"
            >
              {{ avatarText(appointment.patient.name) }}
            </VAvatar>

            <div class="d-flex flex-column">
              <h6 class="text-base">
                <div class="font-weight-medium user-list-name">
                  {{ appointment.patient.name }}
                  <VIcon
                    v-if="appointment.patient.hpercode"
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
                {{ appointment.patient.hpercode ? appointment.patient.hpercode : 'No Hospital Number' }}
              </span>
            </div>
          </div>
        </td>

        <!-- 👉 Schedule -->
        <td>
          <div>
            <VIcon
              size="16"
              icon="tabler-calendar"
            />
            {{ new Date(appointment.date + ' ' + appointment.time).toDateString() }}
          </div>
          <div>
            <VIcon
              size="16"
              icon="tabler-clock"
            />
            {{ new Date(appointment.date + ' ' + appointment.time).toLocaleTimeString() }}
          </div>
        </td>

        <!-- 👉 Service/Type -->
        <td>
          <div class="d-flex flex-column">
            <div>
              {{ getServiceName(appointment.tscode) }}
            </div>
            <div
              :class="{
                'text-success': appointment.type == 'Teleconsultation',
                'text-error': appointment.type == 'Face to Face',
              }"
            >
              {{ appointment.type }}
            </div>
          </div>
        </td>

        <!-- 👉 Type -->
        <td>
          <VChip
            label
            :color="!appointment.enccode ? 'error' : 'success'"
            size="small"
            class="text-capitalize"
          >
            {{ !appointment.enccode ? 'Pending' : 'Registered' }}
          </VChip>
        </td>

        <!-- 👉 Actions -->
        <td
          class="text-center"
          style="width: 5rem;"
        >
          <EditAppointment
            v-if="!appointment.enccode"
            :appointment="appointment"
          />
          <DeleteAppointment
            v-if="!appointment.enccode"
            :appointment="appointment"
          />
          <CreateEncounter
            v-if="!appointment.enccode"
            :appointment="appointment"
          />
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
