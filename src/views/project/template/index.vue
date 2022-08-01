<script setup lang="ts">
import { ref } from 'vue'
import { TabPanelName } from 'element-plus'
import CustomFieldList from './CustomFieldList.vue'
import TestCaseTemplateList from './TestCaseTemplateList.vue'

const activeName = ref('field')
const handleClick = (tab: TabPanelName) => {
  console.log(tab)
  // activeName.value = tab
}
</script>
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
    <el-tab-pane :label="$t('custom_field.name')" name="field">
      <custom-field-list v-if="activeName === 'field'" />
    </el-tab-pane>
    <el-tab-pane :label="$t('workspace.case_template_manage')" name="caseTemplate">
      <test-case-template-list v-if="activeName === 'caseTemplate'" />
    </el-tab-pane>
    <el-tab-pane :label="$t('workspace.issue_template_manage')" name="issueTemplate">Role</el-tab-pane>
  </el-tabs>
</template>
<style scoped lang="scss"></style>
