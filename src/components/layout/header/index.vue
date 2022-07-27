<script setup lang="ts">
import CollapseIcon from './components/CollapseIcon.vue'
import AvatarUser from './components/AvatarUser.vue'
import HeaderWorkspace from './components/HeaderWorkspace.vue'
</script>
<template>
  <div class="header">
    <div class="header-lf flx-center">
      <CollapseIcon />
    </div>
    <div class="header-ri flx-center">
      <header-workspace />
      <!-- <span class="username">NARUTO</span> -->
      <avatar-user />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import './index.scss';
</style>
