<script setup lang="ts">
import NTableOperatorButton from './NTableOperatorButton.vue'
import i18n from '@/i18n'
interface Props {
  isShow?: boolean
  tip1?: string
  tip2?: string
  showDelete?: boolean
  showEdit?: boolean
}
withDefaults(defineProps<Props>(), {
  tip1: i18n.global.t('commons.edit'),
  tip2: i18n.global.t('commons.delete'),
  showDelete: true,
  showEdit: true,
  isShow: false
})
const emits = defineEmits(['editClick', 'deleteClick'])
const editClick = () => {
  emits('editClick')
}
const deleteClick = () => {
  emits('deleteClick')
}
</script>
<template>
  <span>
    <slot name="front" />
    <n-table-operator-button
      v-if="showEdit"
      :tip="tip1"
      icon="edit"
      :disabled="isShow"
      @exec="editClick"
    />
    <slot name="middle" />
    <n-table-operator-button
      v-if="showDelete"
      :tip="tip2"
      icon="delete"
      type="danger"
      :disabled="isShow"
      @exec="deleteClick"
    />
    <slot name="behind" />
  </span>
</template>
<style scoped lang="scss"></style>
