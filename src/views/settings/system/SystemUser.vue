<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import NPagination from '@/components/pagination/index.vue'
import NRolesTag from '@/components/common/NRolesTag.vue'
import { getCurrentUserId } from '@/utils/common'
import NTableOperatorButton from '@/components/common/NTableOperatorButton.vue'
import NTableOperator from '@/components/common/NTableOperator.vue'
import EditUser from './EditUser.vue'
import i18n from '@/i18n'

const state = reactive({
  loading: false,
  condition: {
    name: '',
    page: 1,
    limit: 15
  },
  tableData: {
    data: [] as any,
    total: 0,
    page: 1,
    limit: 15
  },
  currentUserId: ''
})
const editUserRef = ref()
const initTable = () => {}
const create = () => {
  editUserRef.value.openDialog('Add', i18n.global.t('user.create'))
}
const handleEdit = (row: any) => {
  editUserRef.value.openDialog('Edit', i18n.global.t('user.modify'), row)
}
const handleDelete = (row: any) => {}
const handleCurrentChange = () => {}
const handleSizeChange = () => {}
const changeSwitch = (row: any) => {}
const editPassword = (row: any) => {}
onMounted(() => {
  state.currentUserId = getCurrentUserId()
})
</script>
<template>
  <div>
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
        <el-table-column type="selection" width="50" />
        <el-table-column prop="name" :label="$t('commons.name')" width="200" />
        <el-table-column :label="$t('commons.group')" width="150">
          <template #default="scope">
            <n-roles-tag :roles="scope.row.roles" />
          </template>
        </el-table-column>
        <el-table-column prop="email" :label="$t('commons.email')" />
        <el-table-column prop="status" :label="$t('commons.status')" width="120" sortable="custom">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :disabled="state.currentUserId === scope.row.id"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeSwitch(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('commons.create_time')" sortable="custom"></el-table-column>
        <el-table-column prop="source" :label="$t('user.source')" />
        <el-table-column :label="$t('commons.operating')" min-width="120px">
          <template #default="scope">
            <n-table-operator @edit-click="handleEdit(scope.row)" @delete-click="handleDelete(scope.row)">
              <template #behind>
                <n-table-operator-button
                  :tip="$t('member.edit_password')"
                  icon="tools"
                  @exec="editPassword(scope.row)"
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
    <edit-user ref="editUserRef" />
  </div>
</template>
<style scoped lang="scss"></style>
