<script setup lang="ts">
import { User } from '@/api/interface'
import { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import UserOptionItem from './UserOptionItem.vue'
import NDialogFooter from '@/components/common/NDialogFooter.vue'
import i18n from '@/i18n'

interface Props {
  groupType: string
  groupScopeId: string | null
  userResourceUrl: string
}
withDefaults(defineProps<Props>(), {
  groupType: '',
  groupScopeId: '',
  userResourceUrl: '/user/list/'
})
const state = reactive({
  dialogVisible: false,
  form: {
    userIds: '',
    groupIds: '',
    groups: [] as any
  },
  rules: {
    userIds: [{ required: true, message: i18n.global.t('member.please_choose_member'), trigger: ['blur'] }],
    groupIds: [{ required: true, message: i18n.global.t('group.please_select_group'), trigger: ['blur'] }]
  },
  userList: [] as User.ResUser[],
  copyUserList: [],
  result: {}
})
const userFilter = () => {}
const ruleFormRef = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(state.form)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleClose = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  state.dialogVisible = false
}
const openDialog = () => {
  state.dialogVisible = true
}
defineExpose({ openDialog })
</script>
<template>
  <div>
    <el-dialog
      v-model="state.dialogVisible"
      :close-on-click-modal="false"
      :title="$t('member.create')"
      width="45%"
      :destroy-on-close="true"
    >
      <el-form
        ref="ruleFormRef"
        :model="state.form"
        :rules="state.rules"
        label-position="right"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item
          :label="$t('commons.member')"
          prop="userIds"
          :rules="{ required: true, message: $t('member.please_choose_member'), trigger: 'blur' }"
        >
          <el-select
            v-model="state.form.userIds"
            multiple
            filterable
            :filter-method="userFilter"
            :placeholder="$t('member.please_choose_member')"
            class="member_select"
          >
            <el-option v-for="item in state.userList" :key="item.id" :label="item.id" :value="item.id">
              <user-option-item :user="item" />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('commons.group')" prop="groupIds">
          <el-select
            v-model="state.form.groupIds"
            multiple
            :placeholder="$t('group.please_select_group')"
            class="group_select"
          >
            <el-option v-for="item in state.form.groups" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <n-dialog-footer @cancel="handleClose(ruleFormRef)" @confirm="submitForm(ruleFormRef)" />
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
.member_select,
.group_select {
  display: block;
}
</style>
