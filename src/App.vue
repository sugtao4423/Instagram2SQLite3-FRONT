<template>
  <div id="app" class="container">
    <div
      class="row"
      v-for="i in Math.ceil(posts.length / 3)"
      :key="i"
    >
      <div
        class="box col m4 grey lighten-4"
        v-for="post in posts.slice((i - 1) * 3, i * 3)"
        :key="post.timestamp"
      >
        <GraphImage
          v-if="post.typename === 'GraphImage'"
          :imgPath="getPath(post.medias)"
        />

        <GraphVideo
          v-else-if="post.typename === 'GraphVideo'"
          :videoPath="getPath(post.medias)"
        />

        <GraphSidecar
          v-else-if="post.typename === 'GraphSidecar'"
          :dataDirPath="mediaDir"
          :mediaNames="post.medias"
        />

        <div>
            <nl2br tag="p" :text="post.text" />
        </div>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" />
  </div>
</template>

<script>
import axios from 'axios';
import Nl2br from 'vue-nl2br';
import InfiniteLoading from 'vue-infinite-loading';
import GraphImage from './components/GraphImage.vue';
import GraphVideo from './components/GraphVideo.vue';
import GraphSidecar from './components/GraphSidecar.vue';

export default {
  name: 'app',
  data() {
    return {
      pageTitle: 'PAGE_TITLE',
      apiUrl: './getjson.php',
      mediaDir: './data/USERNAME',
      posts: [],
      pageCount: 10,
      page: 0,
    };
  },
  methods: {
    getPath(fileName) {
      return `${this.mediaDir}/${fileName}`;
    },
    async infiniteHandler($state) {
      const postData = (await axios.get(this.apiUrl, {
        params: {
          c: this.pageCount,
          p: this.page += 1,
        },
      })).data;
      this.posts = this.posts.concat(postData);
      $state.loaded();
    },
  },
  mounted() {
    document.title = this.pageTitle;
  },
  components: {
    Nl2br,
    InfiniteLoading,
    GraphImage,
    GraphVideo,
    GraphSidecar,
  },
};
</script>

<style lang="scss">
body {
  background: url('./assets/dust_scratches.png');
}
#app {
  margin-bottom: 20px;
}
.box{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-top: 20px;
  border-radius: 6px;

  &:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
}
</style>
