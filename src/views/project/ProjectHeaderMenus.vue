<script setup lang="ts">
import { reactive } from 'vue'
import ProjectSwitch from '@/components/project/ProjectSwitch.vue'
const state = reactive({
  pathName: '',
  currentProject: ''
})
</script>
<template>
  <div id="menu-bar">
    <el-row :gutter="20">
      <project-switch :project-name="state.currentProject" />
      <el-col :span="14" :offset="0">
        <el-menu :default-active="state.pathName" class="header-menu" :unique-opened="true" mode="horizontal" router>
          <el-menu-item :index="'/project/home'" disabled>{{ $t('project.info') }}</el-menu-item>
          <el-menu-item :index="'/project/member'" disabled>{{ $t('project.member') }}</el-menu-item>
          <el-menu-item :index="'/project/usergroup'" disabled>{{ $t('project.group_permission') }}</el-menu-item>
          <el-sub-menu index="2">
            <template #title>{{ $t('commons.report_statistics.report_filter.more_options') }}</template>
            <el-menu-item :index="'/project/errorreportlibrary'" disabled>{{
              $t('error_report_library.name')
            }}</el-menu-item>
            <el-menu-item :index="'/project/template'">{{ $t('workspace.template_manage') }}</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
      <el-col :span="10" :offset="0"></el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
#menu-bar {
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
}

.el-menu-item {
  padding: 0 10px;
}
</style>
