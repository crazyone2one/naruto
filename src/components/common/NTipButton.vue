<script setup lang="ts">
interface Props {
  tip: string
  icon: string
  type: string
  effect?: string
  size: string
  disabled: boolean
  plain?: boolean
}
withDefaults(defineProps<Props>(), {
  icon: 'question-filled',
  type: 'info',
  effect: 'dark',
  size: 'small',
  disabled: false,
  plain: false
})
const emits = defineEmits(['click'])
const exec = () => {
  emits('click')
}
</script>
<template>
  <el-tooltip placement="bottom" :content="tip" :enterable="false" :effect="effect">
    <!-- <template #content> multiple lines<br />second line </template> -->
    <el-button
      circle
      :plain="plain"
      :disabled="disabled"
      :type="type"
      :icon="icon"
      :size="size"
      @click="exec"
    />
  </el-tooltip>
</template>
<style scoped lang="scss"></style>
