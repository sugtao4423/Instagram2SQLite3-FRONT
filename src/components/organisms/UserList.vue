<script setup lang="ts">
import { createUserPath } from '@/services/paths'
import { getUserList } from '@/services/userlist'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const users = ref<string[]>([])

onMounted(async () => {
  const userList = await getUserList()
  if (userList) {
    users.value = userList.users
  }
})
</script>

<template>
  <div class="user-list-wrapper">
    <div class="user-list">
      <ul>
        <li v-for="user in users" :key="user">
          <RouterLink :to="createUserPath(user)">
            {{ user }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.user-list-wrapper {
  height: calc(100vh - 20px);
}
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
