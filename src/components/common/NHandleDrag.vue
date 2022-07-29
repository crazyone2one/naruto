<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import NInstructionIcon from '@/components/common/NInstructionsIcon.vue'
import draggable from 'vuedraggable'
import { getUUID } from '@/utils/common'

interface Option {
  name: string
  text: string
  id: number
}
interface Props {
  disable: boolean
  isKv: boolean
  data?: [Option]
  //   operators?: any
}
const data: any = computed(() => {
  return props.data
})
console.log(data)

const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return [{ name: 'John', text: 'text', id: 0 }]
  }
  //   operators: () => {
  //     return [
  //       {
  //         icon: 'edit',
  //         click: (element: any, idx: number) => {
  //           if (_disable.value) {
  //             return
  //           }
  //           if (!element.system) {
  //             editIndex.value = idx
  //           }
  //         }
  //       },
  //       {
  //         icon: 'close',
  //         click: (element: any, idx: number) => {
  //           if (_disable.value) {
  //             return
  //           }
  //           data.value.splice(idx, 1)
  //         }
  //       }
  //     ]
  //   }
})
const editIndex = ref(-1)
const drag = ref(false)
const add = () => {
  const item = {
    text: '',
    value: ''
  }
  if (!props.isKv) {
    item.value = getUUID().substring(0, 8)
  }
  data.value.push(item)
  editIndex.value = data.value.length - 1
}
const handleTextEdit = () => {
  if (!props.isKv) {
    editIndex.value = -1
  }
}
const handleValueEdit = (element: any) => {
  if (element.value && element.text) {
    editIndex.value = -1
  }
}
</script>
<template>
  <div class="ms-single-handle-drag">
    <div>
      <el-link class="add-text" :underline="false" :disabled="disable" :icon="Plus" @click="add">
        {{ $t('custom_field.add_option') }}
      </el-link>
      <n-instruction-icon v-if="isKv" size="13" content="选项值用于对接Jira等平台提交缺陷时，对应字段的属性值" />
    </div>

    <draggable v-model="data" class="list-group" item-key="id" @start="drag = true" @end="drag = false">
      <div v-for="(element, idx) in data" :key="idx" class="list-group-item">
        <el-input
          v-if="editIndex === idx"
          v-model="element.text"
          size="small"
          type="text"
          class="text-item"
          :placeholder="$t('custom_field.field_text')"
          @blur="handleTextEdit"
        />
        <span v-else class="text-item">
          <span v-if="element.system">
            {{ $t(element.text) }}
          </span>
          <span v-else>
            {{ element.text }}
          </span>
        </span>
        <el-input
          v-if="editIndex === idx && isKv"
          v-model="element.value"
          size="small"
          type="value"
          class="text-item"
          :placeholder="$t('custom_field.field_value')"
          @blur="handleValueEdit(element)"
        />
        <span v-else-if="isKv" class="text-item">
          <span v-if="element.system">
            {{ $t(element.text) }}
          </span>
          <span v-else>
            {{ (element.value && isKv ? '(' : '') + element.value + (element.value && isKv ? ')' : '') }}
          </span>
        </span>
        <!-- <i
          v-for="(item, index) in operators"
          :key="index"
          class="operator-icon"
          :class="item.icon"
          :disabled="disable"
          @click="item.click(element, idx)"
        /> -->
      </div>
    </draggable>
  </div>
</template>
<style scoped lang="scss">
.text-item {
  margin: 5px;
  width: 150px;
}

.operator-icon:hover {
  font-size: 15px;
  font-weight: bold;
}

.operator-icon {
  margin-right: 6px;
}

.operator-icon:first-child {
  margin-left: 20px;
}

.add-text {
  font-size: 10px;
}

.add-text:hover {
  font-size: 13px;
  font-weight: bold;
}

.instructions-icon {
  margin-left: 5px;
}
</style>
