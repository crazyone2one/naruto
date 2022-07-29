<script setup lang="ts">
import { computed } from 'vue'
import { useApp } from '@/store/modules/app'

// 配置element中英文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const store = useApp()
const locale = computed(() => {
  if (store && store.language === 'zh-cn') {
    return zhCn
  }
  return en
})
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
