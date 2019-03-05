<template functional>
  <div>
    <video
      class="responsive-video"
      :src="props.videoPath"
      controls
    />
  </div>
</template>

<script>
export default {
  props: {
    videoPath: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
</style>
