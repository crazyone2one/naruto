<script setup lang="ts">
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
interface Props {
  title?: string
  withTip?: boolean
}
withDefaults(defineProps<Props>(), {
  title: i18n.global.t('commons.title'),
  withTip: false
})
const state = reactive({
  dialogVisible: false,
  value: '',
  record: {} as any
})
const emits = defineEmits(['delete'])
const confirm = () => {
  if (state.value.trim() !== ('DELETE-' + state.record.name).trim()) {
    ElMessage.warning(i18n.global.t('commons.incorrect_input'))
    return
  }
  emits('delete', state.record)
  state.dialogVisible = false
}
const openDialog = (record: any) => {
  state.dialogVisible = true
  state.value = ''
  state.record = record
}
defineExpose({ openDialog })
</script>
<template>
  <div class="delete-confirm">
    <el-dialog v-model="state.dialogVisible" :close-on-click-modal="false" :title="title">
      <el-row>
        <el-col>
          <span>{{ $t('commons.delete_confirm') }}</span>
          <span class="delete-tip"> DELETE-{{ state.record.name }}</span>
          <br />
        </el-col>
      </el-row>
      <el-row v-if="withTip" class="tip">
        <span>
          <slot class="tip"></slot>
        </span>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-input v-model="state.value" :placeholder="$t('commons.input_content')" />
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogVisible = false">{{ $t('commons.cancel') }}</el-button>
          <el-button type="primary" @click="confirm">{{ $t('commons.confirm') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
.delete-confirm {
  .el-dialog {
    width: 500px;
  }
}
.delete-confirm .el-dialog:first-child {
  margin-bottom: 10px;
}

.delete-confirm .el-row:first-child {
  margin-bottom: 20px;
}

.delete-tip {
  font-style: italic;
  font-weight: bold;
  white-space: pre-wrap;
}

.tip {
  margin-bottom: 20px;
  color: red;
}
</style>
