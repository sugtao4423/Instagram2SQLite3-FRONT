<script setup lang="ts">
import { toRefs } from 'vue'
import { createMediaPath } from '../../services/paths'
import { Post } from '../../services/postlist'
import GraphImage from '../atoms/GraphImage.vue'
import GraphSidecar from '../atoms/GraphSidecar.vue'
import GraphVideo from '../atoms/GraphVideo.vue'

const props = defineProps<{ post: Post; username: string }>()
const { post, username } = toRefs(props)

const isGraphImage = post.value.typename === 'GraphImage'
const isGraphVideo = post.value.typename === 'GraphVideo'
const isGraphSidecar = post.value.typename === 'GraphSidecar'

const paths = post.value.medias.map((mediaUrl) =>
  createMediaPath(username.value, mediaUrl)
)
</script>

<template>
  <div class="box grey lighten-4">
    <GraphImage v-if="isGraphImage" :image-path="paths[0]" />
    <GraphVideo v-else-if="isGraphVideo" :video-path="paths[0]" />
    <GraphSidecar v-else-if="isGraphSidecar" :media-urls="paths" />

    <div>
      <p class="post-text">
        {{ post.text }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.box {
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
  transition: 0.3s;
  margin-top: 20px;
  border-radius: 6px;
}
.box:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.post-text {
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
