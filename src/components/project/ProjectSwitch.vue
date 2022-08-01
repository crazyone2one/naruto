<script setup lang="ts">
import { PROJECT_NAME } from '@/utils/constants.js'
import { ref, watch } from 'vue'
import { Plus, List } from '@element-plus/icons-vue'
import SearchList from './SearchList.vue'

const props = defineProps<{ projectName: string }>()
const currentProject = ref(props.projectName)
watch(currentProject, () => {
  sessionStorage.setItem(PROJECT_NAME, currentProject.value)
})
</script>
<template>
  <el-menu :unique-opened="true" mode="horizontal" default-active="1" :ellipsis="false">
    <el-menu-item v-show="false" index="1">Placeholder</el-menu-item>
    <el-sub-menu index="2" popper-class="submenu">
      <template #title>
        <el-tooltip effect="light" placement="right" :enterable="false">
          <template #content> {{ currentProject }} </template>
          <span class="project-name"> {{ $t('commons.project') }}: {{ currentProject }} </span>
        </el-tooltip>
      </template>
      <search-list v-model:current-project="currentProject" />
      <el-divider />
      <el-menu-item :index="'/setting/project/create'">
        <el-icon><Plus /></el-icon>
        <span style="padding-left: 7px">{{ $t('project.create') }}</span>
      </el-menu-item>
      <el-menu-item :index="'/setting/project/:type'">
        <el-icon><List /></el-icon>
        <span style="padding-left: 7px">{{ $t('commons.show_all') }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<style scoped lang="scss">
.project-name {
  display: inline-block;
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-divider--horizontal {
  margin: 0;
}
</style>
