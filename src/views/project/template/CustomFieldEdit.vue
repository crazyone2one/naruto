<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import NDialog from '@/components/common/NDialog.vue'
import i18n from '@/i18n'
import type { FormInstance, FormRules } from 'element-plus'
import { CUSTOM_FIELD_SCENE_OPTION, CUSTOM_FIELD_TYPE_OPTION, SYSTEM_FIELD_NAME_MAP } from '@/utils/table-constants'
import NHandleDrag from '@/components/common/NHandleDrag.vue'

interface Props {
  labelWidth?: string
  scene?: string
}
const props = withDefaults(defineProps<Props>(), {
  labelWidth: '100px',
  scene: ''
})
const state = reactive({
  visible: false,
  title: i18n.global.t('custom_field.create'),
  url: ''
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  name: [
    { required: true, message: i18n.global.t('test_track.case.input_name'), trigger: 'blur' },
    { max: 64, message: i18n.global.t('test_track.length_less_than') + '64', trigger: 'blur' }
  ],
  scene: [{ required: true, trigger: 'change' }],
  type: [{ required: true, trigger: 'change' }]
})
const ruleForm = reactive({
  name: '',
  type: 'input',
  scene: 'TEST_CASE',
  remark: '',
  system: false,
  options: [] as any
})
const formSize = ref('default')
const isSystem = computed(() => {
  return ruleForm.system
})
const systemNameMap = computed(() => {
  return SYSTEM_FIELD_NAME_MAP
})
const isTemplateEdit = computed(() => {
  return props.scene
})
const planSceneOptions = computed(() => {
  const tmp = [...CUSTOM_FIELD_SCENE_OPTION]
  tmp.push({ value: 'PLAN', text: i18n.global.t('workstation.table_name.track_plan') }) // 创建和编辑不能选测试计划
  return tmp
})
const sceneOptions = computed(() => {
  return CUSTOM_FIELD_SCENE_OPTION
})
const fieldTypeOptions = computed(() => {
  return CUSTOM_FIELD_TYPE_OPTION
})
const showOptions = computed(() => {
  return ['select', 'multipleSelect', 'radio', 'checkbox'].includes(ruleForm.type)
})
const openDialog = (title: string, param?: any) => {
  state.visible = true
  state.title = title
  if (param) {
    Object.assign(ruleForm, param)
    if (!(param.options instanceof Array)) {
      ruleForm.options = param.options ? JSON.parse(param.options) : []
    }
    state.url = param.id ? 'custom/field/update' : 'custom/field/add'
  } else {
    if (isTemplateEdit.value) {
      ruleForm.scene = props.scene
    }
    state.url = 'custom/field/add'
  }
}
const emits = defineEmits(['refresh'])
const save = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      emits('refresh')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  state.visible = false
}
defineExpose({ openDialog })
</script>
<template>
  <n-dialog
    ref="editDialog"
    width="30%"
    :dialog-visible="state.visible"
    :title="state.title"
    :append-to-body="true"
    :show-close="false"
    @confirm="save(ruleFormRef)"
    @cancel="resetForm(ruleFormRef)"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
      label-position="right"
    >
      <el-form-item :label="$t('custom_field.field_name')" prop="name" :label-width="labelWidth">
        <el-input v-if="isSystem" :disabled="isSystem" :value="$t(systemNameMap[ruleForm.name])" autocomplete="off" />
        <el-input v-else v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('custom_field.field_remark')" prop="remark" :label-width="labelWidth">
        <el-input v-model="ruleForm.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
      </el-form-item>
      <el-form-item :label="$t('custom_field.scene')" prop="type" :label-width="labelWidth">
        <el-select
          v-model="ruleForm.scene"
          :placeholder="$t('custom_field.scene')"
          filterable
          :disabled="isSystem || isTemplateEdit"
        >
          <el-option
            v-for="item in ruleForm.scene === 'PLAN' ? planSceneOptions : sceneOptions"
            :key="item.value"
            :label="$t(item.text)"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('custom_field.field_type')" prop="type" :label-width="labelWidth">
        <el-select v-model="ruleForm.type" :placeholder="$t('custom_field.field_type')" filterable :disabled="isSystem">
          <el-option v-for="item in fieldTypeOptions" :key="item.value" :label="$t(item.text)" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="showOptions"
        :label="$t('custom_field.field_option')"
        prop="options"
        :label-width="labelWidth"
      >
        <n-handle-drag
          :is-kv="ruleForm.scene === 'ISSUE'"
          :disable="ruleForm.name === '用例等级'"
          :data="ruleForm.options"
        />
      </el-form-item>
    </el-form>
  </n-dialog>
</template>
<style scoped lang="scss"></style>
