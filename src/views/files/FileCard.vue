<script setup>
import { useFileStore } from '@/stores/file.js'

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
})

const fileStore = useFileStore()

const getFileIcon = type => {
  switch (type) {
  case 'image':
    return 'tabler-photo'
  case 'video':
    return 'tabler-video'
  case 'audio':
    return 'tabler-volume'
  case 'text':
    return 'tabler-file-text'
  case 'application':
    return 'tabler-box'
  default:
    return 'tabler-file'
  }
}

const viewFile = async file => {
  fileStore.selected_file = Object.assign({}, file)
  fileStore.viewer = true
}

const downloadFile = async file => {
  window.open(file.url, '_blank').focus()
}

const deleteFile = async file => {
  // do something
}
</script>

<template>
  <VCard :loading="fileStore.selected_file && fileStore.loading && fileStore.selected_file.name == file.name">
    <div class="d-flex flex-column-reverse flex-md-row">
      <div>
        <VCardItem>
          <VCardTitle>
            <VIcon
              :icon="getFileIcon(file.contentType.split('/')[0])"
            />
            {{ file.name }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="d-flex align-center flex-wrap text-body-1">
          Uploaded {{ new Date(file.timeCreated).toDateString() }}
        </VCardText>

        <VCardText>
          {{ file.customMetadata?.description }}
        </VCardText>
      </div>

      <VSpacer />

      <div
        v-if="file.contentType.includes('image') && file.url"
        class="ma-auto pa-5"
      >
        <VImg
          :width="176"
          :src="file.url"
          class="rounded"
          @click="viewFile(file)"
        />
      </div>
    </div>

    <VCardActions>
      <VBtn @click="downloadFile(file)">
        Download
      </VBtn>
      <VBtn
        color="error"
        @click="deleteFile(file)"
      >
        Delete
      </VBtn>
    </VCardActions>
  </VCard>
</template>

