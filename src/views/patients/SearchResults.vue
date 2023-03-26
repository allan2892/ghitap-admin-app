<script setup>
import { usePatientStore } from '@/stores/patient.js'
import { avatarText } from '@core/utils/formatters.js'

const patientStore = usePatientStore()

const selectRecord = result => {
  // do something
}

watchEffect(() => {
  if(!patientStore.search_dialog) {
    patientStore.search_results = []
    patientStore.search_queries = {}
  }
})
</script>

<template>
  <VTable class="text-no-wrap">
    <!-- 👉 table head -->
    <thead>
      <tr>
        <th scope="col">
          Patient
        </th>
        <th scope="col">
          Other Information
        </th>
        <th scope="col">
          Select
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(result, index) in patientStore.search_results"
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
              {{ avatarText(result.patfirst + ' ' + result.patlast) }}
            </VAvatar>

            <div class="d-flex flex-column">
              <h6 class="text-base">
                <div class="font-weight-medium user-list-name">
                  {{ result.patlast + ', ' + result.patfirst }}
                </div>
              </h6>
              <span class="text-sm text-disabled">{{ result.hpercode }}</span>
            </div>
          </div>
        </td>

        <td>
          <div class="d-flex flex-column">
            <div>
              <VIcon
                icon="tabler-calendar-event"
              />
              <span class="text-sm">{{ result.patbdate }}</span>
            </div>
            <div class="d-flex">
              <VIcon
                :icon="result.patsex == 'M' ? 'tabler-gender-male' : 'tabler-gender-female'"
                :color="result.patsex == 'M' ? 'primary' : 'error'"
              />
              <div
                class="text-capitalize"
                :class="{ 'text-primary': result.patsex == 'M', 'text-error': result.patsex == 'F' }"
              >
                {{ result.patsex == 'M' ? 'Male' : 'Female' }}
              </div>
            </div>
          </div>
        </td>

        <td>
          <VBtn
            color="primary"
            class="me-3"
            size="small"
            @click="selectRecord(result)"
          >
            Select
          </VBtn>
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
