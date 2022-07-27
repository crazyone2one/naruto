<script setup lang="ts">
import { ref } from 'vue'
import NTipButtom from './NTipButton.vue'
const isReadOnly = ref<Boolean>(false)
interface Props {
  isDivButton?: boolean
  icon?: string
  type?: string
  tip: string
  disabled?: boolean
}
withDefaults(defineProps<Props>(), {
  isDivButton: false,
  icon: 'question-filled',
  type: 'primary',
  disabled: false
})
const emits = defineEmits(['exec'])
const exec = () => {
  emits('exec')
}
</script>
<template>
  <el-tooltip v-if="isDivButton" placement="bottom" :content="tip" :enterable="false" effect="dark">
    <!-- <template #content> multiple lines<br />second line </template> -->
    <el-button
      circle
      :disabled="isReadOnly"
      type="primary"
      style="color: white; padding: 0px 0.1px; width: 28px; height: 28px"
      size="small"
      @click="exec"
    >
      <div style="transform: scale(0.8)">
        <span style="margin-left: -4px; line-height: 27px">{{ tip }}</span>
      </div>
    </el-button>
  </el-tooltip>
  <n-tip-buttom
    v-else
    :disabled="disabled"
    :type="type"
    :tip="tip"
    :icon="icon"
    size="small"
    circle
    @click="exec"
  />
</template>
<style scoped lang="scss"></style>
