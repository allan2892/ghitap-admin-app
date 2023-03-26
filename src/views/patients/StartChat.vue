<script setup>
const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
})

const openChat = async () => {
  // do something
}
</script>

<template>
  <VBtn
    icon
    variant="text"
    color="default"
    size="x-small"
    @click="openChat"
  >
    <VIcon
      icon="tabler-message-circle"
      :size="22"
    />
  </VBtn>
</template>