<script setup lang="ts">
import { getCurrentUserId, getCurrentWorkspaceId } from '@/utils/common'
import { reactive, onMounted } from 'vue'
import i18n from '@/i18n'
import { Workspace } from '@/api/interface'
import { Search } from '@element-plus/icons-vue'
import { userWorkspaceList } from '@/api/modules/workspace'
import { switchWorkspace } from '@/api/modules/user'
import { useUserInfo } from '@/store/modules/userInfo'
const userInfo = useUserInfo()
const state = reactive({
  workspaceList: [] as Workspace.WorkspaceItem[],
  currentUserId: getCurrentUserId(),
  workspaceIds: [],
  currentWorkspaceName: '',
  wsListCopy: [{ name: i18n.global.t('workspace.none') }],
  searchString: ''
})
const handleClick = (workspace: Workspace.WorkspaceItem) => {
  const workspaceId = workspace.id
  if (!workspaceId || getCurrentWorkspaceId() === workspaceId) {
    return false
  }
  switchWorkspace(workspaceId).then(res => {
    userInfo.setToken(res.data?.token)
    userInfo.setLastProjectId(res.data?.lastProjectId)
    userInfo.setLastWorkspaceId(res.data?.lastWorkspaceId)
    userInfo.setUserInfo(res.data)
    state.currentWorkspaceName = state.workspaceList.filter(
      (r: Workspace.WorkspaceItem) => r.id === getCurrentWorkspaceId()
    )[0].name
  })
}
const initData = () => {
  userWorkspaceList(state.currentUserId).then(response => {
    state.workspaceList = response.data
    state.wsListCopy = response.data
    const workspace = response.data.filter((r: Workspace.WorkspaceItem) => r.id === getCurrentWorkspaceId())
    if (workspace.length > 0) {
      state.currentWorkspaceName = workspace[0].name
      state.workspaceList = response.data.filter((r: Workspace.WorkspaceItem) => r.id !== getCurrentWorkspaceId())
      state.workspaceList.unshift(workspace[0])
    }
  })
}
onMounted(() => {
  initData()
})
</script>
<template>
  <div class="ws">
    <el-dropdown placement="bottom" class="align-right" @command="handleClick">
      {{ state.currentWorkspaceName }}
      <template #dropdown>
        <el-dropdown-menu style="margin-top: 5px">
          <el-input
            v-model="state.searchString"
            :placeholder="i18n.global.t('project.search_by_name')"
            :prefix-icon="Search"
            clearable
            class="search-input"
          />
          <div class="dropdown-content">
            <el-dropdown-item v-for="(item, index) in state.workspaceList" :key="index" :command="item">
              {{ item.name }}
              <el-icon v-if="getCurrentWorkspaceId() === item.id"><Check /></el-icon>
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style scoped lang="scss">
.el-icon-check {
  color: #783887;
  margin-left: 10px;
  font-weight: bold;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  position: fixed;
}

::-webkit-scrollbar-thumb {
  border-radius: 1em;
  background-color: var(--color_shallow);
  position: fixed;
}

::-webkit-scrollbar-track {
  border-radius: 1em;
  background-color: transparent;
  position: fixed;
}

.search-input {
  padding: 0;
  margin-top: -5px;
}

.search-input {
  .el-input__inner {
    border-radius: 0;
    border-color: #b4aebe;
  }
}

::v-deep(.el-submenu__title) {
  padding-left: 5px;
}

.dropdown-link {
  cursor: pointer;
  font-size: 12px;
  line-height: 40px;
  padding-right: 10px;
  padding-left: 5px;
}

.align-right {
  float: right;
}

.dropdown-content {
  height: 240px;
  overflow: auto;
  /*margin-top: 5px;*/
}

/* 设置滚动条的样式 */
.dropdown-content::-webkit-scrollbar {
  width: 8px;
}

/* 滚动槽 */
.dropdown-content::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
.dropdown-content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
}

.dropdown-content::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}

.global {
  color: var(--color);
}
</style>
