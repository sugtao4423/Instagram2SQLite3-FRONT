import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import PostList from './components/organisms/PostList.vue'
import UserList from './components/organisms/UserList.vue'

const routes = [
  { path: '/', component: UserList },
  { path: '/:username', component: PostList },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
