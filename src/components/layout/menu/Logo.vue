<script setup lang="ts">
defineProps<{ isCollapse: boolean }>()
</script>
<template>
  <div class="logo flx-center">
    <img src="@/assets/images/logo.svg" alt="logo" />
    <span v-show="!isCollapse">Naruto</span>
  </div>
</template>
<style scoped lang="scss">
@import './index.scss';
</style>
