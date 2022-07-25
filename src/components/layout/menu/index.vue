<script setup lang="ts">
import { ref, computed } from 'vue'
import { useApp } from '@/store/modules/app'
import Logo from './Logo.vue'
import { useRoute } from 'vue-router'
import { Menu as IconMenu } from '@element-plus/icons-vue'

const route = useRoute()
const app = useApp()
const isCollapse = computed(() => {
  return app.themeConfig.isCollapse
})
const screenWidth = ref<number>(0)
const activeMenu = computed((): string => route.path)
// 监听窗口大小变化，合并 aside
const listeningWindow = () => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth
      if (isCollapse.value === false && screenWidth.value < 1200) app.setCollapse()
      if (isCollapse.value === true && screenWidth.value > 1200) app.setCollapse()
    })()
  }
}
listeningWindow()
</script>
<template>
  <div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
    <logo :is-collapse="isCollapse" />
    <el-menu
      :default-active="activeMenu"
      :collapse-transition="false"
      :unique-opened="true"
      :collapse="isCollapse"
    >
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss"></style>
