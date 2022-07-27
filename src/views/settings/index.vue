<script setup lang="ts">
import SettingMenu from './SettingMenu.vue'
</script>
<template>
  <div>
    <el-container>
      <el-aside style="width: 200px">
        <setting-menu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<style scoped lang="scss">
.el-container {
  height: 100%;
}
</style>
