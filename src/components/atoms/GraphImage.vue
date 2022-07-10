<script setup lang="ts">
defineProps<{ imagePath: string }>()
</script>

<template>
  <div>
    <a :href="imagePath" target="_blank" rel="noopener noreferrer">
      <img :src="imagePath" alt="image" />
    </a>
  </div>
</template>
