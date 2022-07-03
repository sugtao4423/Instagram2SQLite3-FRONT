<script setup lang="ts">
import GraphImage from './GraphImage.vue'
import GraphVideo from './GraphVideo.vue'

defineProps<{ mediaUrls: string[] }>()

const isVideo = (mediaUrl: string) => mediaUrl.endsWith('.mp4')
</script>

<template>
  <div class="graph-sidecar">
    <div v-for="mediaUrl in mediaUrls" :key="mediaUrl">
      <GraphVideo v-if="isVideo(mediaUrl)" :video-path="mediaUrl" />
      <GraphImage v-else :image-path="mediaUrl" />
    </div>
  </div>
</template>

<style scoped>
.graph-sidecar {
  display: flex;
}
</style>
