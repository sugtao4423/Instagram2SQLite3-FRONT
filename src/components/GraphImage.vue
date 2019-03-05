<template functional>
  <div>
    <a
      :href="props.imgPath"
      target="_blank"
    >
      <img
        class="responsive-img"
        :src="props.imgPath"
      >
    </a>
  </div>
</template>

<script>
export default {
  props: {
    imgPath: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
</style>
