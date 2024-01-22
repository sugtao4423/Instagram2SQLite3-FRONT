<script setup lang="ts">
import Post from '@/components/molecules/Post.vue'
import { getPostList, type Post as IPost } from '@/services/postlist'
import InfiniteLoading from 'v3-infinite-loading'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

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
    <div class="row">
      <Post
        v-for="post in posts"
        :key="post.timestamp"
        :post="post"
        :username="username"
        class="col-12 col-md-6 col-lg-4"
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
