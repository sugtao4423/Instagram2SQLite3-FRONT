<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import InfiniteLoading from 'v3-infinite-loading'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPostList, Post as IPost } from '../../services/postlist'
import Post from '../molecules/Post.vue'

const username = useRoute().params.username as string
const posts = ref<IPost[]>([])
const page = ref<number>(1)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadData = async ($state?: any) => {
  const postList = await getPostList(username, page.value++)
  if (postList) {
    if (postList.length <= 0) {
      $state?.complete()
      return
    }
    posts.value = posts.value.concat(postList)
  }
  $state?.loaded()
}

onMounted(() => {
  document.title = username
})
</script>

<template>
  <div class="container">
    <div v-for="i in Math.ceil(posts.length / 3)" :key="i" class="row">
      <Post
        v-for="post in posts.slice((i - 1) * 3, i * 3)"
        :key="post.timestamp"
        :post="post"
        :username="username"
        class="col m4"
      />
    </div>
    <InfiniteLoading @infinite="loadData">
      <template #spinner>
        <span>Loading...</span>
      </template>
      <template #complete>
        {{ null }}
      </template>
    </InfiniteLoading>
  </div>
</template>
