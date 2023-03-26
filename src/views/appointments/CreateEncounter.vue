<script setup>
const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },
})

const generateTeleconsultation = async () => {
  // do something
}
</script>

<template>
  <VBtn
    v-if="props.appointment.patient?.hpercode && props.appointment.tscode"
    icon
    size="x-small"
    color="default"
    variant="text"
    @click="generateTeleconsultation"
  >
    <VIcon
      size="22"
      icon="tabler-clipboard-plus"
    />
  </VBtn>
</template>
