<script setup lang="ts">
import { SYSTEM_FIELD_NAME_MAP } from '@/utils/table-constants'
import { computed } from 'vue'
import CustomFieldComponent from './CustomFiledComponent.vue'

interface Props {
  tableData: []
  scene: string
  platform: string
  templateContainIds: []
}
withDefaults(defineProps<Props>(), {
  tableData: () => {
    return []
  }
})
const systemNameMap = computed(() => {
  return SYSTEM_FIELD_NAME_MAP
})
</script>
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" :label="$t('commons.name')">
        <template #default="scope">
          <span v-if="scope.row.system">
            {{ $t(systemNameMap[scope.row.name]) }}
          </span>
          <span v-else>
            {{ scope.row.name }}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="type" :label="$t('commons.default')" min-width="200">
        <template #default="scope">
          <custom-field-component :data="scope.row" prop="defaultValue" :is-template-edit="true" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="scss"></style>
