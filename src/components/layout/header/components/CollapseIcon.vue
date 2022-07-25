<script setup lang="ts">
import { useApp } from '@/store/modules/app'
import { computed } from 'vue'
const app = useApp()
const isCollapse = computed(() => {
  return app.themeConfig.isCollapse
})
</script>
<template>
  <el-icon class="collapse-icon" @click="app.setCollapse()">
    <component :is="isCollapse ? 'expand' : 'fold'"></component>
  </el-icon>
</template>
<style scoped lang="scss">
@import '../index.scss';
</style>
