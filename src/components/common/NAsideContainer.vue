<script setup lang="ts">
import { reactive, onMounted, nextTick, watch, computed } from 'vue'
import { getUUID } from '@/utils/common'
interface Props {
  width: string
  enableAsideHidden: boolean
  enableAutoHeight: boolean
  minWidth: string
  height: number
  defaultHiddenBottomTop: number
}
const props = withDefaults(defineProps<Props>(), {
  width: '300px',
  enableAsideHidden: true,
  enableAutoHeight: false,
  minWidth: '',
  height: 0,
  defaultHiddenBottomTop: 0
})

const state = reactive({
  asideHidden: false,
  hiddenBottomTop: '',
  id: getUUID()
})

watch(
  () => state.asideHidden,
  (val: boolean) => {
    state.asideHidden = val
  }
)
const setHiddenBottomTop = () => {
  if (props.defaultHiddenBottomTop) {
    state.hiddenBottomTop = props.defaultHiddenBottomTop + 'px'
  } else {
    const e = document.getElementById(state.id)
    if (!e) return
    state.hiddenBottomTop = e.clientHeight / 3 + 'px'
  }
}
onMounted(() => {
  nextTick(() => {
    setHiddenBottomTop()
  })
})
const calHeight = computed(() => {
  return props.height ? props.height + 'px' : props.enableAutoHeight ? null : 'calc(100vh-50px)'
})
const containerCalHeight = computed(() => {
  return props.height
    ? props.height - 30 + 'px'
    : props.enableAutoHeight
    ? null
    : 'calc(100vh-50px)'
})
</script>
<template>
  <el-aside
    :id="state.id"
    :width="width"
    class="ms-aside-container"
    :style="{
      'margin-left': !state.asideHidden ? 0 : '-' + width,
      'min-width': minWidth + 'px',
      height: calHeight
    }"
  >
    <div
      v-if="enableAsideHidden"
      class="hiddenBottom"
      :style="{ top: state.hiddenBottomTop ? state.hiddenBottomTop : 0 }"
      @click="state.asideHidden = !state.asideHidden"
    >
      <el-icon v-if="!state.asideHidden"><ArrowLeft /></el-icon>
      <el-icon v-if="state.asideHidden"><ArrowRight /></el-icon>
    </div>
    <div
      style="overflow: scroll"
      class="ms-aside-node-tree"
      :style="{ height: containerCalHeight } as any"
    >
      <slot></slot>
    </div>
  </el-aside>
</template>
<style scoped lang="scss">
.ms-aside-container {
  border: 1px solid #e6e6e6;
  padding: 10px;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: #fff;
  /*height: calc(100vh - 80px);*/
  border-right: 0px;
  position: relative;
  overflow: visible;
}

.hiddenBottom {
  width: 8px;
  height: 50px;
  /*top: calc((100vh - 80px)/3);*/
  right: -10px;
  /*top: 0;*/
  line-height: 50px;
  border-radius: 0 15px 15px 0;
  background-color: #acb7c1;
  display: inline-block;
  position: absolute;
  cursor: pointer;
  opacity: 0.4;
  font-size: 2px;
  margin-left: 1px;
}

.hiddenBottom i {
  margin-left: -2px;
}

.hiddenBottom:hover {
  background-color: #783887;
  opacity: 0.8;
  width: 12px;
}

.hiddenBottom:hover i {
  margin-left: 0;
  color: white;
}
</style>
