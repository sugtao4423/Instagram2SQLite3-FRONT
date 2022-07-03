<script setup lang="ts">
defineProps<{ videoPath: string }>()
</script>

<template>
  <div>
    <video :src="videoPath" controls class="responsive-video" />
  </div>
</template>
