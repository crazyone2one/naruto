<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getCurrentUserId, getCurrentProjectId, getCurrentWorkspaceId } from '@/utils/common.js'
import { Project } from '@/api/interface'
import { relatedList } from '@/api/modules/project.js'
import { updateCurrentProject } from '@/api/modules/user.js'
import i18n from '@/i18n'
import { useUserInfo } from '@/store/modules/userInfo'

const userInfo = useUserInfo()
defineProps<{ currentProject: string }>()
const emits = defineEmits<{
  (e: 'update:currentProject', value: string): void
}>()
const state = reactive({
  result: {},
  items: [] as Project.ProjectItem[],
  searchArray: [] as Project.ProjectItem[],
  searchString: '',
  userId: getCurrentUserId()
})
const init = () => {
  const param = {
    userId: getCurrentUserId(),
    workspaceId: getCurrentWorkspaceId()
  }
  relatedList(param).then(resp => {
    state.items = resp.data
    state.searchArray = resp.data
    const projectId = getCurrentProjectId()
    if (projectId) {
      if (state.searchArray.length > 0 && state.searchArray.map(p => p.id).indexOf(projectId) === -1) {
        change(state.items[0].id)
      }
    } else {
      if (state.items.length > 0) {
        change(state.items[0].id)
      }
    }
    changeProjectName(projectId)
  })
}
const change = (projectId: string) => {
  let currentProjectId = getCurrentProjectId()
  if (projectId === currentProjectId) {
    return
  }
  updateCurrentProject({ id: state.userId, lastProjectId: projectId }).then(resp => {
    currentProjectId = projectId
    userInfo.setLastProjectId = resp.data.lastProjectId as any
    changeProjectName(projectId)
  })
}
const changeProjectName = (projectId: string | null) => {
  if (projectId) {
    const project = state.searchArray.filter(p => p.id === projectId)
    if (project.length > 0) {
      emits('update:currentProject', project[0].name)
    }
  } else {
    emits('update:currentProject', i18n.global.t('project.select'))
  }
}
onMounted(() => {
  init()
})
const createFilter = (queryString: string) => {
  return (item: Project.ProjectItem) => {
    return item.name.indexOf(queryString) !== -1
  }
}
const query = (queryString: string) => {
  state.items = queryString ? state.searchArray.filter(createFilter(queryString)) : state.searchArray
}
watch(
  () => state.searchString,
  val => {
    query(val)
  }
)
</script>
<template>
  <div>
    <el-input
      v-model="state.searchString"
      :placeholder="$t('project.search_by_name')"
      class="search-input"
      :prefix-icon="Search"
      clearable
    />
    <div v-if="state.items.length === 0" style="text-align: center; margin: 15px 0">
      <span style="font-size: 15px; color: #8a8b8d">
        {{ $t('project.no_data') }}
      </span>
    </div>
    <div v-else style="height: 150px; overflow: auto">
      <el-menu-item v-for="i in state.items" :key="i.id" @click="change(i.id)">
        <template #title>
          <div class="title">
            {{ i.name }}
          </div>
          <el-icon v-if="i.id === getCurrentProjectId()" class="el-icon-check"><Check /></el-icon>
        </template>
      </el-menu-item>
    </div>
  </div>
</template>
<style scoped lang="scss">
.search-input {
  padding: 0;
  margin-top: -5px;
}

.search-input {
  .el-input__inner {
    border-radius: 0;
  }
}

.title {
  display: inline-block;
  padding-left: 10px;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-icon-check {
  color: #773888;
  margin-left: 2px;
  font-weight: bold;
}
</style>
