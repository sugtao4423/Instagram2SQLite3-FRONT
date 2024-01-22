<script setup lang="ts">
import GraphImage from '@/components/atoms/GraphImage.vue'
import GraphSidecar from '@/components/atoms/GraphSidecar.vue'
import GraphVideo from '@/components/atoms/GraphVideo.vue'
import { createMediaPath } from '@/services/paths'
import type { Post } from '@/services/postlist'
import { toRefs } from 'vue'

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
  <div class="post">
    <GraphImage v-if="isGraphImage" :image-path="paths[0]" />
    <GraphVideo v-else-if="isGraphVideo" :video-path="paths[0]" />
    <GraphSidecar v-else-if="isGraphSidecar" :media-urls="paths" />

    <div>
      <p class="post__text">
        {{ post.text }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.post {
  height: fit-content;
  border-radius: 0.25rem;
  margin-top: 1.5rem;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  transition: 0.3s;
  background-color: #f5f5f5;
}
.post:hover {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
}
.post__text {
  margin: 0.5rem 0 1rem;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
