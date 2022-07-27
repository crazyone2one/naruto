<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({
  loading: false,
  condition: {
    name: '',
    page: 1,
    limit: 15
  },
  tableData: {
    data: [],
    total: 0,
    page: 1,
    limit: 15
  }
})
const initTable = () => {}
const handleEdit = () => {}
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
          <el-button size="default" type="success" class="ml10" @click="handleEdit">
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
      </el-table>
      <!-- <n-pagination
        :pageable="state.tableData"
        :handle-current-change="handleCurrentChange"
        :handle-size-change="handleSizeChange"
      /> -->
    </el-card>
  </div>
</template>
<style scoped lang="scss"></style>
