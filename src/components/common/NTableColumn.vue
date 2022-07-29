<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Field {
  id: string
  key: string
  label: string
}

interface Props {
  prop: string
  label: string
  width?: string
  minWidth?: string | number
  field: Field
  fixed?: string | boolean
  showOverflowTooltip?: boolean
  editable?: boolean
}
withDefaults(defineProps<Props>(), {
  field: () => {
    return { id: '', key: '', label: '' }
  },
  showOverflowTooltip: true,
  editable: false,
  width: '',
  fixed: false,
  minWidth: ''
})
const active = ref<Boolean>(false)
onMounted(() => {
  active.value = true
})
defineEmits(['click'])
</script>
<template>
  <el-table-column
    v-if="active"
    :min-width="minWidth"
    :width="width"
    :fixed="fixed"
    :prop="prop"
    :label="label"
    :show-overflow-tooltip="showOverflowTooltip"
  >
    <template #default="scope">
      <span v-if="!editable" @click="$emit('click', scope.row)">{{ scope.row[prop] }}</span>
    </template>
  </el-table-column>
</template>
<style scoped lang="scss"></style>
