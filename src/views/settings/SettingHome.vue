<script setup lang="ts">
import { ref } from 'vue'
const statistic = ref({
  userSize: 0,
  workspaceSize: 0,
  projectSize: 0
})
</script>
<template>
  <div>
    <el-card class="setting-card">
      <div class="setting-div">
        <el-card style="height: 100%; width: 100%">
          <template #header>
            <div class="card-header" style="padding: 5px 0">
              <span style="font-size: 18px; font-weight: bold">{{ $t('commons.system_data') }}</span>
            </div>
          </template>
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
            <div class="div-item">
              <el-icon :size="30" class="icon-color"><User /></el-icon>
              {{ $t('commons.system_user') }} <span class="number"> {{ statistic.userSize }} </span>
              {{ $t('commons.user_unit') }}
            </div>
            <div class="div-item">
              <el-icon :size="30" class="icon-color"><Platform /></el-icon>
              {{ $t('commons.system_workspace') }}
              <span class="number"> {{ statistic.workspaceSize }} </span>
              {{ $t('commons.workspace_unit') }}
            </div>
            <div class="div-item">
              <el-icon :size="30" class="icon-color"><List /></el-icon>
              {{ $t('commons.system_project') }}
              <span class="number"> {{ statistic.projectSize }} </span>
              {{ $t('commons.workspace_unit') }}
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>
<style scoped lang="scss">
.setting-div {
  width: 60vh;
  height: 60vh;
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 400px;
  min-height: 400px;
  transform: translate(-50%, -50%);
}

.setting-card {
  height: calc(100vh - 55px);
  position: relative;
}

.icon-color {
  font-size: 30px;
  color: var(--primary_color);
  margin-right: 6px;
}

.div-item {
  width: 100%;
  padding: 20px;
}

.number {
  font-size: 20px;
  color: var(--primary_color);
}
</style>
