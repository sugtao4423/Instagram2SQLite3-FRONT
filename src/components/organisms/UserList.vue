<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createUserPath } from '../../services/paths'
import { getUserList } from '../../services/userlist'

const users = ref<string[]>([])

onMounted(async () => {
  const userList = await getUserList()
  if (userList) {
    users.value = userList.users
  }
})
</script>

<template>
  <div class="user-list">
    <ul class="collection">
      <li v-for="user in users" :key="user" class="collection-item">
        <router-link :to="createUserPath(user)">
          {{ user }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.user-list {
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
@media only screen and (min-width: 601px) {
  .user-list {
    width: unset;
  }
}
</style>
