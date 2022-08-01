<script setup lang="ts">
import { reactive, onMounted, ref, computed, watch } from 'vue'
import { Project } from '@/api/interface'
import { projectPageList, getMemberList } from '@/api/modules/project'
import { getCurrentWorkspaceId, getCurrentProjectId } from '@/utils/common'
import EditProject from '@/views/project/menu/EditProject.vue'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
import NPagination from '@/components/pagination/index.vue'
import NTableOperator from '@/components/common/NTableOperator.vue'
import NTableOperatorButton from '@/components/common/NTableOperatorButton.vue'
import NDeleteConfirm from '@/components/common/NDeleteConfirm.vue'
import { FolderAdd, Search } from '@element-plus/icons-vue'
import AddMember from '../common/AddMember.vue'

const state = reactive({
  loading: false,
  condition: {
    name: '',
    workspaceId: '' as any,
    page: 1,
    limit: 15
  },
  tableData: {
    data: [] as Project.ProjectItem[],
    total: 0,
    page: 1,
    limit: 15
  },
  member: {
    memberLineData: []
  }
})
const projectId = computed(() => {
  return getCurrentProjectId()
})
const workspaceId = computed(() => {
  return getCurrentWorkspaceId()
})

watch(workspaceId, () => {
  initTable()
})
// 初始化列表
const initTable = async () => {
  // state.loading = true
  state.condition.workspaceId = workspaceId
  await projectPageList(state.condition).then(response => {
    const data: Project.ResProject = response.data
    state.tableData.data = data.records
    state.tableData.total = data.total
    for (let i = 0; i < state.tableData.data.length; i++) {
      const project = state.tableData.data[i]
      const param = {
        projectId: project.id
      }
      getMemberList(getCurrentWorkspaceId(), param).then(response => {
        const member = response.data.records
        project.memberSize = member.length
      })
    }
  })
}
const editProjectRef = ref()
// add
const create = () => {
  // const workspaceId = getCurrentWorkspaceId()
  if (!workspaceId.value) {
    ElMessage.warning(i18n.global.t('project.please_choose_workspace'))
    return false
  }
  const title = i18n.global.t('project.create')
  editProjectRef.value.openDialog(title)
}

const jumpPage = (project: Project.ProjectItem) => {
  console.log(project)
}
const cellClick = (project: Project.ProjectItem) => {
  console.log(project)
  memberDialog.value = true
}
const handleEdit = (project: Project.ProjectItem) => {
  const title = i18n.global.t('project.edit')
  editProjectRef.value.openDialog(title, project)
}
const deleteConfirm = ref()
const handleDelete = (project: Project.ProjectItem) => {
  deleteConfirm.value.openDialog(project)
}
const _handleDelete = (project: Project.ProjectItem) => {}
onMounted(() => {
  initTable()
})
const handleCurrentChange = () => {}
const handleSizeChange = () => {}

const memberDialog = ref(false)
const handleEditMember = (row: any) => {}
const handleDeleteMember = (row: any) => {}
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
          <el-button size="default" type="success" class="ml10" @click="create">
            <el-icon>
              <folderAdd />
            </el-icon>
          </el-button>
        </div>
      </template>
      <el-table ref="userTable" :data="state.tableData.data" style="width: 100%">
        <el-table-column prop="name" :label="$t('commons.name')" min-width="100" show-overflow-tooltip>
          <template #default="scope">
            <el-link type="primary" class="member-size" @click="jumpPage(scope.row)">
              {{ scope.row.name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="description" :label="$t('commons.description')" show-overflow-tooltip />
        <el-table-column :label="$t('commons.member')">
          <template #default="scope">
            <el-link type="primary" class="member-size" @click="cellClick(scope.row)">
              {{ scope.row.memberSize }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="createUser" :label="$t('commons.create_user')" show-overflow-tooltip></el-table-column>
        <el-table-column
          min-width="100"
          sortable
          prop="createTime"
          :label="$t('commons.create_time')"
          show-overflow-tooltip
        />
        <el-table-column :label="$t('commons.operating')" width="180">
          <template #default="scope">
            <n-table-operator
              :show-delete="projectId !== scope.row.id"
              @edit-click="handleEdit(scope.row)"
              @delete-click="handleDelete(scope.row)"
            >
              <template #behind>
                <n-table-operator-button
                  :tip="$t('api_test.environment.environment_config')"
                  icon="setting"
                  type="info"
                  :disabled="true"
                />
                <n-table-operator-button
                  :tip="$t('load_test.other_resource')"
                  icon="files"
                  type="success"
                  :disabled="true"
                />
              </template>
            </n-table-operator>
          </template>
        </el-table-column>
      </el-table>
      <n-pagination
        :pageable="state.tableData"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      />
    </el-card>
    <edit-project ref="editProjectRef" @reload="initTable" />
    <n-delete-confirm ref="deleteConfirm" :title="$t('project.delete')" @delete="_handleDelete" />

    <!-- member -->
    <el-dialog v-model="memberDialog" :close-on-click-modal="false" width="70%" :destroy-on-close="true">
      <template #header>
        <el-button :icon="Search" circle />
        <el-button type="primary" :icon="FolderAdd" circle />
      </template>
      <el-table :data="state.member.memberLineData" style="width: 100%; margin-top: 5px">
        <el-table-column prop="name" :label="$t('commons.username')" />
        <el-table-column prop="email" :label="$t('commons.email')" />
        <el-table-column prop="phone" :label="$t('commons.phone')" />
        <el-table-column :label="$t('commons.group')" width="150"></el-table-column>
        <el-table-column :label="$t('commons.operating')">
          <template #default="scope">
            <n-table-operator
              :tip2="$t('commons.remove')"
              @edit-click="handleEditMember(scope.row)"
              @delete-click="handleDeleteMember(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <add-member
      ref="addMemberRef"
      :group-type="'PROJECT'"
      :group-scope-id="workspaceId"
      :user-resource-url="'user/ws/current/member/list'"
    />
  </div>
</template>
<style scoped lang="scss"></style>
