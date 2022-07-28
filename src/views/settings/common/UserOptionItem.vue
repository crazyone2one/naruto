<script setup lang="ts">
import { User } from '@/api/interface'

interface Props {
  user: User.ResUser
}
withDefaults(defineProps<Props>(), {
  user: () => {
    return {
      id: '',
      name: '',
      email: ''
    } as User.ResUser
  }
})
</script>
<template>
  <div>
    <span class="user-select-left">{{ user.name }}</span>
    <span class="user-select-right">{{ user.email }}</span>
  </div>
</template>
<style scoped lang="scss">
.user-select-left {
  //   float: left;
  display: inline-block;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-select-left:hover {
  overflow: visible;
}

.user-select-right {
  float: right;
  color: #8492a6;
  font-size: 13px;
}
</style>
