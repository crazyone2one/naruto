<script setup lang="ts">
import { reactive } from 'vue'
import i18n from '@/i18n'
import NTableOperator from '@/components/common/NTableOperator.vue'
import NTableOperatorButton from '@/components/common/NTableOperatorButton.vue'
import NPagination from '@/components/pagination/index.vue'

const state = reactive({
  caseTypeMap: {
    functional: i18n.global.t('api_test.home_page.failed_case_list.table_value.case_type.functional')
  } as any,
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
  }
})

const initTableData = () => {}
const handleCreate = () => {}
const handleEdit = (row: any) => {
  console.log(row)
}
const handleDelete = (row: any) => {
  console.log(row)
}
const handleCopy = (row: any) => {
  console.log(row)
}
const handleCurrentChange = () => {}
const handleSizeChange = () => {}
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
          <el-button size="default" type="primary" class="ml10" @click="initTableData">
            <el-icon>
              <search />
            </el-icon>
          </el-button>
          <el-button size="default" type="success" class="ml10" @click="handleCreate">
            <el-icon>
              <folderAdd />
            </el-icon>
          </el-button>
        </div>
      </template>
      <el-table ref="userTable" :data="state.tableData.data" style="width: 100%">
        <el-table-column prop="name" :label="$t('commons.name')">
          <template #default="scope">
            <span v-if="scope.row.system">{{ scope.row.name }}({{ $t('custom_field.default_template') }})</span>
            <span v-else>
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('api_test.home_page.failed_case_list.table_coloum.case_type')" prop="type">
          <template #default="scope">
            <span>{{ state.caseTypeMap[scope.row.type] }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('custom_field.system_template')" prop="system">
          <template #default="scope">
            <span v-if="scope.row.system">
              {{ $t('commons.yes') }}
            </span>
            <span v-else>
              {{ $t('commons.no') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.description')" prop="description" />
        <!-- <el-table-column :label="$t('commons.remark')" prop="remark" /> -->
        <el-table-column :label="$t('commons.create_time')" prop="createTime">
          <template #default="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.update_time')" prop="updateTime">
          <template #default="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" min-width="120px">
          <template #default="scope">
            <n-table-operator @edit-click="handleEdit(scope.row)" @delete-click="handleDelete(scope.row)">
              <template #middle>
                <n-table-operator-button
                  icon="copy-document"
                  :tip="i18n.global.t('commons.copy')"
                  :disabled="scope.row.system"
                  type="success"
                  @exec="handleCopy"
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
  </div>
</template>
<style scoped lang="scss"></style>
