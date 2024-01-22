<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import 'assets/css/reset.css';
@import 'assets/css/grid.css';
#app {
  padding-bottom: 20px;
  background-image: url('./assets/dust_scratches.png');
}
img,
video {
  max-width: 100%;
  height: auto;
}
</style>
