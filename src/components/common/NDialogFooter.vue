<script setup lang="ts">
interface Props {
  isShow?: boolean
  title?: string
  btnSize?: string
}
withDefaults(defineProps<Props>(), {
  isShow: false,
  title: '',
  btnSize: 'default'
})
const emits = defineEmits(['cancel', 'confirm', 'saveAsEdit'])
const saveAsEdit = () => {
  emits('saveAsEdit')
}
const confirm = () => {
  emits('confirm')
}
const cancel = () => {
  emits('cancel')
}
</script>
<template>
  <div class="dialog-footer">
    <el-button :size="btnSize" @click="cancel">{{ $t('commons.cancel') }}</el-button>
    <el-button type="primary" :size="btnSize" @click="confirm">{{ $t('commons.confirm') }}</el-button>
    <el-button v-if="isShow" type="primary" @click="saveAsEdit">{{ title }}</el-button>
  </div>
</template>
<style scoped lang="scss"></style>
