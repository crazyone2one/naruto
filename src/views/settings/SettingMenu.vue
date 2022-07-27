<script setup lang="ts">
import { reactive } from 'vue'
import setting from '@/router/modules/setting'

interface Menu {
  index: string
  title: string
}
const getMenus = (group: string) => {
  const menus = [] as Menu[]
  const settingChild = setting.children[0]
  settingChild.children.forEach((child: any) => {
    if (child.meta[group] === true) {
      const menu = { index: setting.path + '/' + child.path, title: child.meta.title }
      menus.push(menu)
    }
  })
  return menus
}
const state = reactive({
  systems: getMenus('system'),
  workspaces: getMenus('workspace')
  // project: getMenus('project'),
  // workspaceTemplate: getMenus('workspaceTemplate')
})
</script>
<template>
  <el-menu menu-trigger="click" :default-active="$route.path" router class="setting">
    <el-sub-menu index="1">
      <template #title>
        <el-icon class="icon account"><location /></el-icon>
        <span>{{ $t('commons.system') }}</span>
      </template>
      <el-menu-item
        v-for="menu in state.systems"
        :key="menu.index"
        :index="menu.index"
        class="setting-item"
        >{{ $t(menu.title) }}</el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon class="icon account"><location /></el-icon>
        <span>{{ $t('commons.workspace') }}</span>
      </template>
      <el-menu-item
        v-for="menu in state.workspaces"
        :key="menu.index"
        :index="menu.index"
        class="setting-item"
        >{{ $t(menu.title) }}</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>
<style scoped lang="scss">
.setting {
  border-right: 0;
  width: 200px;
}

.setting .setting-item {
  height: 40px;
  line-height: 40px;
}

.icon {
  width: 24px;
  margin-right: 10px;
}

.account {
  color: #5a78f0;
}

.lower_submenu_title {
  .el-submenu__title {
    height: 40px;
    line-height: 40px;
  }
}

.workspace {
  color: #44b349;
}
</style>
