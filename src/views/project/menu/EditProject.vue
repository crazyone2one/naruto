<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import i18n from '@/i18n'
import NDialogFooter from '@/components/common/NDialogFooter.vue'
import { Project } from '@/api/interface'
import { getCurrentUserId, getCurrentWorkspaceId } from '@/utils/common'
import { saveProject } from '@/api/modules/project'

const ruleFormRef = ref<FormInstance>()
const dialogVisible = ref(false)
const state = reactive({
  title: '',
  labelWidth: '150px',
  platformOptions: [],
  ruleForm: {
    name: '',
    description: ''
  } as Project.ProjectItem
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: i18n.global.t('project.input_name'), trigger: 'blur' },
    { min: 2, max: 50, message: i18n.global.t('commons.input_limit', [2, 50]), trigger: 'blur' }
  ],
  description: [{ max: 250, message: i18n.global.t('commons.input_limit', [0, 250]), trigger: 'blur' }]
})
const openDialog = (title: string, project?: any) => {
  dialogVisible.value = true
  state.title = title
  if (project) {
    state.ruleForm = Object.assign({}, project)
  }
}
const emits = defineEmits(['reload'])
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let saveType = 'add'
      if (state.ruleForm.id) {
        saveType = 'update'
      }
      state.ruleForm.workspaceId = getCurrentWorkspaceId()
      state.ruleForm.createUser = getCurrentUserId()
      saveProject(saveType, state.ruleForm).then(resp => {
        console.log(resp)
        dialogVisible.value = false
        emits('reload')
        ElMessage.success(i18n.global.t('commons.save_success'))
      })
    } else {
      console.log('error submit!', fields)
      return false
    }
  })
}

const handleClose = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dialogVisible.value = false
}
defineExpose({ openDialog })
</script>
<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="state.title"
      :close-on-click-modal="false"
      @close="handleClose(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="state.ruleForm"
        :rules="rules"
        label-position="right"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item :label-width="state.labelWidth" :label="$t('commons.name')" prop="name">
          <el-input v-model="state.ruleForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="state.labelWidth" :label="$t('commons.description')" prop="description">
          <el-input
            v-model="state.ruleForm.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <n-dialog-footer @cancel="handleClose(ruleFormRef)" @confirm="submitForm(ruleFormRef)" />
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss"></style>
