<script setup lang="ts">
import { ref } from 'vue'
import { TabsPaneContext } from 'element-plus'
import CustomFieldList from './CustomFieldList.vue'

const activeName = ref('field')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane :label="$t('custom_field.name')" name="field">
      <custom-field-list v-if="activeName === 'field'" />
    </el-tab-pane>
    <el-tab-pane :label="$t('workspace.case_template_manage')" name="caseTemplate">Config</el-tab-pane>
    <el-tab-pane :label="$t('workspace.issue_template_manage')" name="issueTemplate">Role</el-tab-pane>
  </el-tabs>
</template>
<style scoped lang="scss"></style>
