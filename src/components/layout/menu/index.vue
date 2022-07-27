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
      router
    >
      <el-menu-item index="/workstation" disabled>
        <el-icon><icon-menu /></el-icon>
        <template #title>{{ $t('commons.my_workstation') }}</template>
      </el-menu-item>
      <el-menu-item index="/track" disabled>
        <el-icon><hot-water /></el-icon>
        <template #title>{{ $t('test_track.test_track') }}</template>
      </el-menu-item>
      <el-menu-item index="/api" disabled>
        <el-icon><list /></el-icon>
        <template #title>{{ $t('commons.api') }}</template>
      </el-menu-item>
      <el-menu-item index="/ui" disabled>
        <el-icon><list /></el-icon>
        <template #title>{{ $t('commons.ui') }}</template>
      </el-menu-item>
      <el-menu-item index="/report" disabled>
        <el-icon><monitor /></el-icon>
        <template #title>{{ $t('commons.report_statistics.title') }}</template>
      </el-menu-item>
      <el-menu-item index="/project" disabled>
        <el-icon><setting /></el-icon>
        <template #title>{{ $t('commons.project_setting') }}</template>
      </el-menu-item>
      <el-menu-item index="/setting">
        <el-icon><setting /></el-icon>
        <template #title>{{ $t('commons.system_setting') }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss"></style>
