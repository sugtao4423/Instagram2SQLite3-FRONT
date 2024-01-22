import App from '@/App.vue'
import PostList from '@/components/organisms/PostList.vue'
import UserList from '@/components/organisms/UserList.vue'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: UserList },
    { path: '/:username', component: PostList },
  ],
})

createApp(App).use(router).mount('#app')
