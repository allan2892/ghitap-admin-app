<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  drawer: {
    type: Boolean,
    required: true,
  },
  input: {
    type: Object,
    default: null,
  },
  labels: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:drawer',
  'submit',
])

const data = ref(null)

watchEffect(() => {
  if(props.drawer) {
    data.value = Object.assign({}, props.input)
  } else {
    data.value = null
  }
})

const refVForm = ref()

const onSubmit = () => {
  refVForm.value?.validate().then( async ({ valid: isValid }) => {
    if (isValid) {
      emit('submit', data.value)
    }
  })
}
</script>

<template>
  <div>
    <VNavigationDrawer
      :model-value="props.drawer"
      temporary
      :width="400"
      :location="$vuetify.display.smAndDown ? 'bottom' : 'right'"
      class="scrollable-content"
      @update:model-value="v => emit('update:drawer', v)"
    >
      <!-- 👉 Title -->
      <div class="d-flex align-center pa-6 pb-1">
        <h6 class="text-h6">
          {{ props.title }}
        </h6>

        <VSpacer />

        <!-- 👉 Close btn -->
        <VBtn
          variant="tonal"
          color="default"
          icon
          size="32"
          class="rounded"
          @click="v => emit('update:drawer', false)"
        >
          <VIcon
            size="18"
            icon="tabler-x"
          />
        </VBTn>
      </div>

      <PerfectScrollbar
        v-if="data"
        :options="{ wheelPropagation: false }"
      >
        <VCard flat>
          <VCardText>
            <VForm
              ref="refVForm"
              @submit.prevent="onSubmit"
            >
              <VRow>
                <!-- 👉 Type -->
                <VCol
                  v-for="(item, index) in props.labels"
                  :key="index"
                  cols="12"
                >
                  <VTextField
                    v-if="item.type == 'text' || item.type == 'date' || item.type == 'time'"
                    v-model="data[item.value]"
                    :type="item.type"
                    :label="item.text"
                    :rules="item.rules"
                    :disabled="props.loading || (item.noEdit && props.isEditing)"
                  />

                  <VSelect
                    v-else-if="item.type == 'select'"
                    v-model="data[item.value]"
                    :label="item.text"
                    :items="item.items"
                    :rules="item.rules"
                    :disabled="props.loading || (item.noEdit && props.isEditing)"
                  />

                  <VTextarea
                    v-else-if="item.type == 'textarea'"
                    v-model="data[item.value]"
                    :label="item.text"
                    :rules="item.rules"
                    :disabled="props.loading || (item.noEdit && props.isEditing)"
                  />
                </VCol>

                <!-- 👉 Submit and Cancel -->
                <VCol cols="12">
                  <VBtn
                    type="submit"
                    class="me-3"
                    :loading="props.loading"
                  >
                    Submit
                  </VBtn>
                  <VBtn
                    type="reset"
                    variant="tonal"
                    color="secondary"
                    :disabled="props.loading"
                    @click="emit('update:drawer', false)"
                  >
                    Cancel
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </PerfectScrollbar>
    </VNavigationDrawer>
  </div>
</template>
