<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  CUSTOM_FIELD_SCENE_OPTION,
  CUSTOM_FIELD_TYPE_OPTION,
  FIELD_TYPE_MAP,
  SCENE_MAP,
  SYSTEM_FIELD_NAME_MAP
} from '@/utils/table-constants'
import { getCurrentProjectId, getTranslateOptions } from '@/utils/common'
import i18n from '@/i18n'
import NPagination from '@/components/pagination/index.vue'
import CustomFieldEdit from './CustomFieldEdit.vue'
import { pageList } from '@/api/modules/custom-field'
import NTableOperator from '@/components/common/NTableOperator.vue'
import NTableOperatorButton from '@/components/common/NTableOperatorButton.vue'
import { CustomField } from '@/api/interface'

const state = reactive({
  fieldFilters: [] as any,
  sceneFilters: [] as any,
  condition: {
    name: '',
    projectId: '' as any,
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
const customFieldEditRef = ref()
const fieldTypeMap = computed(() => {
  return FIELD_TYPE_MAP
})
const sceneMap = computed(() => {
  return SCENE_MAP
})
const systemNameMap = computed(() => {
  return SYSTEM_FIELD_NAME_MAP
})
// const tableHeight = computed(() => {
//   return document.documentElement.clientHeight - 200
// })
const initTable = async () => {
  state.condition.projectId = getCurrentProjectId()
  await pageList(state.condition).then(resp => {
    state.tableData.data = resp.data.records
    state.tableData.total = resp.data.total
  })
}

const handleCreate = () => {
  customFieldEditRef.value.openDialog(i18n.global.t('custom_field.create'))
}
const handleEdit = (row: CustomField.CustomField) => {
  customFieldEditRef.value.openDialog(i18n.global.t('custom_field.update'), row)
}
const handleCopy = (row: CustomField.CustomField) => {
  console.log(row)
}
const handleDelete = (row: CustomField.CustomField) => {
  console.log(row)
}
onMounted(() => {
  initTable()
  state.fieldFilters = getTranslateOptions(CUSTOM_FIELD_TYPE_OPTION)
  state.sceneFilters = getTranslateOptions(CUSTOM_FIELD_SCENE_OPTION)
})
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
          <el-button size="default" type="primary" class="ml10" @click="initTable">
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
        <el-table-column prop="name" :label="$t('commons.name')" width="200">
          <template #default="scope">
            <span v-if="scope.row.system">
              {{ $t(systemNameMap[scope.row.name]) }}
            </span>
            <span v-else>
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('custom_field.scene')" prop="scene" width="200">
          <template #default="scope">
            <span>{{ $t(sceneMap[scope.row.scene]) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('custom_field.attribute_type')" prop="type">
          <template #default="scope">
            <span>{{ $t(fieldTypeMap[scope.row.type]) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('custom_field.system_field')" prop="system">
          <template #default="scope">
            <span v-if="scope.row.system">
              {{ $t('commons.yes') }}
            </span>
            <span v-else>
              {{ $t('commons.no') }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.remark')" prop="remark" />
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
    <custom-field-edit ref="customFieldEditRef" @refresh="initTable" />
  </div>
</template>
<style scoped lang="scss"></style>
