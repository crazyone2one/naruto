<script setup lang="ts">
import { computed } from 'vue'
import NDialogFooter from './NDialogFooter.vue'

interface Props {
  title: string
  dialogVisible: boolean
  appendToBody?: boolean
  width?: string
  withFooter?: boolean
  closeOnClickModal?: boolean
  showClose?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: 'title',
  dialogVisible: false,
  appendToBody: false,
  width: '50%',
  withFooter: true,
  closeOnClickModal: false,
  showClose: true
})
interface Emits {
  (e: 'update:dialogVisible', dialogVisible: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}
const emit = defineEmits<Emits>()
const _dialogVisible = computed({
  get() {
    return props.dialogVisible
  },
  set(visible: boolean) {
    emit('update:dialogVisible', visible)
  }
})
const handleClose = () => {
  emit('update:dialogVisible', false)
  emit('close')
}
const handleCancel = () => {
  emit('cancel')
}
const handleConfirm = () => {
  emit('confirm')
}
</script>
<template>
  <el-dialog
    v-model="_dialogVisible"
    :title="title"
    :width="width"
    destroy-on-close
    :close-on-click-modal="closeOnClickModal"
    :append-to-body="appendToBody"
    :show-close="showClose"
    @close="handleClose"
  >
    <slot name="header"></slot>
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <div v-if="withFooter" class="dialog-footer">
          <n-dialog-footer @cancel="handleCancel" @confirm="handleConfirm" />
        </div>
      </slot>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
