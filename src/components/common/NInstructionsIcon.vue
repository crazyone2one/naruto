<script setup lang="ts">
interface Props {
  content: string
  icon?: string
  placement?: string
  effect?: string
  size?: string
}
withDefaults(defineProps<Props>(), {
  icon: 'question-filled',
  placement: 'top-start',
  effect: 'dark',
  size: '16'
})
</script>
<template>
  <el-tooltip :placement="placement" class="instructions-icon" :effect="effect">
    <template #content> {{ content }} </template>
    <el-icon :size="size"><InfoFilled /></el-icon>
  </el-tooltip>
</template>
<style scoped lang="scss">
.el-icon-info {
  color: #606266;
}

.el-icon-info:hover {
  color: #409eff;
}

.instructions-icon {
  margin-left: 5px;
}
</style>
