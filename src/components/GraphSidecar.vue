<template functional>
  <div
    class="sidecar-images"
  >
    <div
      v-for="fileName in props.mediaNames.split(',')"
      :key="fileName"
    >

      <GraphVideo
        v-if="fileName.endsWith('mp4')"
        :videoPath="`${props.dataDirPath}/${fileName}`"
      />

      <GraphImage
        v-else
        :imgPath="`${props.dataDirPath}/${fileName}`"
      />
    </div>
  </div>
</template>

<script>
import GraphImage from '@/components/GraphImage.vue';
import GraphVideo from '@/components/GraphVideo.vue';

export default {
  props: {
    dataDirPath: {
      type: String,
      required: true,
    },
    mediaNames: {
      type: String,
      required: true,
    },
  },
  components: {
    GraphImage,
    GraphVideo,
  },
};
</script>

<style scoped lang="scss">
.sidecar-images{
  display: flex;
}
</style>
