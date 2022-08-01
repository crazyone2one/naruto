<script setup lang="ts">
import i18n from '@/i18n'
import { computed } from 'vue'

interface DataProps {
  type: string
  options: [any]
  [key: string]: any
}
interface Props {
  data: DataProps
  prop: string
  form: {}
  disabled: boolean
  isTemplateEdit: boolean
}
const props = defineProps<Props>()
const getTranslateOption = (item: any) => {
  return item.system ? i18n.global.t(item.text) : item.text
}
interface Emits {
  (e: 'update:data[prop]', dialogVisible: any): void
}
const emit = defineEmits<Emits>()
const _data = computed({
  get() {
    return props.data
  },
  set(visible: any) {
    emit('update:data[prop]', visible)
  }
})
const handleChange = () => {}
</script>
<template>
  <div>
    <el-select
      v-if="data.type === 'select' || data.type === 'multipleSelect'"
      v-model="_data[prop]"
      :disabled="disabled"
      :multiple="data.type === 'multipleSelect'"
      :placeholder="$t('commons.default')"
    >
      <el-option
        v-for="(item, index) in data.options ? data.options : []"
        :key="index"
        :label="getTranslateOption(item)"
        :value="item.value"
      />
    </el-select>
    <el-input
      v-else-if="data.type === 'textarea'"
      v-model="_data[prop]"
      type="textarea"
      :rows="2"
      :disabled="disabled"
      :placeholder="$t('commons.input_content')"
      class="custom-with"
      @change="handleChange"
    />
  </div>
</template>
<style scoped lang="scss"></style>
