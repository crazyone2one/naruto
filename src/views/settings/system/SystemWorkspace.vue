<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import i18n from '@/i18n'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import NTableOperator from '@/components/common/NTableOperator.vue'
import {
  deleteWsById,
  getMemberList,
  saveWorkspace,
  workspacePageList
} from '@/api/modules/workspace'
import { Workspace } from '@/api/interface'
import { getCurrentUserId, getCurrentWorkspaceId } from '@/utils/common'
import NDialogFooter from '@/components/common/NDialogFooter.vue'
import NDeleteConfirm from '@/components/common/NDeleteConfirm.vue'
import NPagination from '@/components/pagination/index.vue'

const state = reactive({
  loading: false,
  condition: {
    name: '',
    page: 1,
    limit: 15
  },
  tableData: {
    data: [] as Workspace.WorkspaceItem[],
    total: 0,
    page: 1,
    limit: 15
  },
  editWorkspaceDialogVisible: false,
  form: {
    name: '',
    description: ''
  } as Workspace.WorkspaceItem,
  rules: {
    name: [
      { required: true, message: i18n.global.t('workspace.input_name'), trigger: 'blur' },
      { min: 2, max: 25, message: i18n.global.t('commons.input_limit', [2, 25]), trigger: 'blur' },
      {
        required: true,
        pattern: /^(?!-)(?!.*?-$)[a-zA-Z0-9\u4e00-\u9fa5-]+$/,
        message: i18n.global.t('workspace.special_characters_are_not_supported'),
        trigger: 'blur'
      }
    ],
    description: [
      { max: 50, message: i18n.global.t('commons.input_limit', [0, 50]), trigger: 'blur' }
    ]
  }
  // title: i18n.global.t('workspace.create')
})
const editWorkspaceFromRef = ref<FormInstance>()
const workspaceId = computed(() => {
  // return ''
  return getCurrentWorkspaceId()
})

const initTable = async () => {
  await workspacePageList(state.condition).then(res => {
    state.tableData.data = res.data.records
    state.tableData.total = res.data.total
    for (let i = 0; i < state.tableData.data.length; i++) {
      const ws = state.tableData.data[i]
      const _param = {
        name: '',
        workspaceId: ws.id
      }
      getMemberList(_param).then(resp => {
        const data: Array<Workspace.WorkspaceItem> = resp.data
        ws.memberSize = data.length
      })
    }
  })
}
const handleEditWs = (row?: Workspace.WorkspaceItem) => {
  state.editWorkspaceDialogVisible = true
  if (row) {
    state.form = Object.assign({}, row)
  }
}
const deleteConfirm = ref()
const handleDeleteWs = (workspace: Workspace.WorkspaceItem) => {
  deleteConfirm.value.openDialog(workspace)
}
const _handleDelete = (workspace: Workspace.WorkspaceItem) => {
  ElMessageBox.confirm(i18n.global.t('workspace.delete_confirm'), '', {
    confirmButtonText: i18n.global.t('commons.confirm'),
    cancelButtonText: i18n.global.t('commons.cancel'),
    type: 'warning'
  })
    .then(() => {
      deleteWsById(workspace.id).then(() => {
        initTable()
        ElMessage.success(i18n.global.t('commons.delete_success'))
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: i18n.global.t('commons.delete_cancelled')
      })
    })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  state.editWorkspaceDialogVisible = false
}
// saveWorkspace
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const saveType = state.form.id ? 'update' : 'special/add'
      state.form.createUser = state.form.id ? state.form.createUser : getCurrentUserId()
      saveWorkspace(saveType, state.form).then(() => {
        state.editWorkspaceDialogVisible = false
        initTable()
        ElMessage.success(i18n.global.t('commons.save_success'))
      })
    } else {
      console.log('error submit!', fields)
      return false
    }
  })
}
const handleSizeChange = (size: number) => {
  state.condition.limit = size
  state.tableData.limit = size
  state.condition.page = 1
  state.tableData.page = 1
  initTable()
}

const handleCurrentChange = (page: number) => {
  state.condition.page = page
  state.tableData.page = page
  initTable()
}

onMounted(() => {
  initTable()
})
</script>
<template>
  <div v-loading="state.loading">
    <el-card>
      <template #header>
        <div class="system-user-search mb5">
          <el-input
            v-model="state.condition.name"
            size="default"
            placeholder="search"
            style="max-width: 180px"
            clearable
          />
          <el-button size="default" type="primary" class="ml10" @click="initTable">
            <el-icon>
              <search />
            </el-icon>
          </el-button>
          <el-button size="default" type="success" class="ml10" @click="handleEditWs">
            <el-icon>
              <folderAdd />
            </el-icon>
          </el-button>
        </div>
      </template>
      <el-table ref="userTable" :data="state.tableData.data" style="width: 100%">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="name" :label="$t('commons.name')" width="200" />
        <el-table-column prop="description" :label="$t('commons.description')" />
        <el-table-column :label="$t('commons.member')">
          <template #default="scope">
            <span>{{ scope.row.memberSize }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" min-width="120px">
          <template #default="scope">
            <n-table-operator
              :show-delete="workspaceId !== scope.row.id"
              @edit-click="handleEditWs(scope.row)"
              @delete-click="handleDeleteWs(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <n-pagination
        :pageable="state.tableData"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      />
    </el-card>
    <!-- add workspace -->
    <el-dialog
      v-model="state.editWorkspaceDialogVisible"
      :title="state.form.id ? $t('workspace.update') : $t('workspace.create')"
      :close-on-click-modal="false"
      destroy-on-close
      width="30%"
      draggable
    >
      <el-form
        ref="editWorkspaceFromRef"
        :model="state.form"
        label-position="right"
        label-width="100px"
        :rules="state.rules"
      >
        <el-form-item :label="$t('commons.name')" prop="name">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('commons.description')" prop="description">
          <el-input v-model="state.form.description" type="textarea" class="form-input" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <n-dialog-footer
            @cancel="resetForm(editWorkspaceFromRef)"
            @confirm="submitForm(editWorkspaceFromRef)"
          />
        </span>
      </template>
    </el-dialog>
    <n-delete-confirm ref="deleteConfirm" @delete="_handleDelete" />
  </div>
</template>
<style scoped lang="scss"></style>
