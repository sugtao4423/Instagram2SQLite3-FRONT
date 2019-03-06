<template>
  <div id="app" class="container">
    <div
      class="row"
      v-for="i in Math.ceil(posts.length / 3)"
      :key="i"
    >
      <div
        class="box col m4"
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
            <p>{{ post.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GraphImage from './components/GraphImage.vue';
import GraphVideo from './components/GraphVideo.vue';
import GraphSidecar from './components/GraphSidecar.vue';

export default {
  name: 'app',
  data() {
    return {
      apiUrl: './getjson.php',
      mediaDir: './data/USERNAME',
      posts: [],
      pageCount: 10,
      page: 0,
      fetching: false,
    };
  },
  methods: {
    getPath(fileName) {
      return `${this.mediaDir}/${fileName}`;
    },
    async loadMore() {
      this.fetching = true;
      const postData = (await axios.get(this.apiUrl, {
        params: {
          c: this.pageCount,
          p: this.page += 1,
        },
      })).data;
      this.posts = this.posts.concat(postData);
      this.fetching = false;
    },
    infiniteScroll() {
      // eslint-disable-next-line
      if (document.body.offsetTop + document.body.offsetHeight < document.documentElement.scrollTop + window.innerHeight) {
        if (!this.fetching) {
          this.loadMore();
        }
      }
    },
  },
  created() {
    window.addEventListener('scroll', this.infiniteScroll);
    this.loadMore();
  },
  async mounted() {
    await this.loadMore();
  },
  components: {
    GraphImage,
    GraphVideo,
    GraphSidecar,
  },
};
</script>

<style lang="scss">
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
