<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import NDialogFooter from '@/components/common/NDialogFooter.vue'
import { GROUP_SYSTEM } from '@/utils/constants'
import { userGroupList, getGroupByType } from '@/api/modules/user'

const dialogVisible = ref(false)
// const title = ref<String>('创建用户')
// const type = ref<String>('Add')
const ruleFormRef = ref<FormInstance>()
// const ruleForm = reactive<any>({})
const state = reactive({
  userGroup: [],
  workspaces: [],
  projects: [],
  currentWSGroupIndex: -1,
  currentGroupWSIds: new Set(),
  btnAddRole: false,
  type: 'Add',
  title: '创建用户',
  ruleForm: {
    groups: [
      {
        type: ''
      }
    ]
  } as any
})
// const ws = computed(() => {
//   return GROUP_WORKSPACE
// })
// const project = computed(() => {
//   return GROUP_PROJECT
// })
const rules = reactive<FormRules>({})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log(state.ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
const addGroup = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const roleInfo = {} as any
      roleInfo.selects = []
      const ids = state.ruleForm.groups.map((r: any) => r.type)
      ids.forEach((id: any) => {
        roleInfo.selects.push(id)
      })
      const groups = state.ruleForm.groups
      groups.push(roleInfo)
      if (state.ruleForm.groups.length > state.userGroup.length - 1) {
        state.btnAddRole = true
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dialogVisible.value = false
}

// const getLabel = (index: number) => {
//   const a = index + 1
//   return i18n.global.t('commons.group') + a
// }
// const activeGroup: any = (roleInfo: any) => {
//   return state.userGroup.filter(function (group: Group) {
//     let value = true
//     if (!roleInfo.selects) {
//       return true
//     }
//     if (roleInfo.selects.length === 0) {
//       value = true
//     }
//     for (let i = 0; i < roleInfo.selects.length; i++) {
//       const idType = group.id + '+' + group.type
//       if (idType === roleInfo.selects[i]) {
//         value = false
//       }
//     }
//     console.log(value)
//     return value
//   })
// }
// const getResource = (idType: string, index: number) => {
//   if (!idType) {
//     return
//   }
//   const id = idType.split('+')[0]
//   const type = idType.split('+')[1]
//   if (index > 0 && state.ruleForm.groups[index].ids && state.ruleForm.groups[index].ids.length > 0) {
//     return
//   }
//   let isHaveWorkspace = false
//   if (type === 'PROJECT') {
//     for (let i = 0; i < state.ruleForm.groups.length; i++) {
//       const group = state.ruleForm.groups[i]
//       const _type = group.type.split('+')[1]
//       if (_type === 'WORKSPACE') {
//         isHaveWorkspace = true
//         break
//       }
//     }
//   } else if (type === 'WORKSPACE') {
//     isHaveWorkspace = true
//   }
//   resourceList(id, type).then(resp => {
//     const data = resp.data
//     if (data) {
//       _setResource(data, index, type)
//       if (isHaveWorkspace === false) {
//         addWorkspaceGroup(id, index)
//       }
//     }
//   })
// }
// const _setResource = (data: any, index: number, type: string) => {
//   switch (type) {
//     case GROUP_WORKSPACE:
//       state.ruleForm.groups[index].workspaces = data.workspaces
//       break
//     case GROUP_PROJECT:
//       state.ruleForm.groups[index].projects = data.projects
//       break
//     default:
//       break
//   }
// }
// const addWorkspaceGroup = (id: string, index: number) => {
//   let isHaveWorkSpace = false
//   state.ruleForm.groups.forEach((item: any) => {
//     if (item.type === 'ws_member+WORKSPACE') {
//       isHaveWorkSpace = true
//     }
//     if (isHaveWorkSpace) {
//       return
//     }
//     resourceList(id, 'WORKSPACE').then(res => {
//       const data = res.data
//       if (data) {
//         const roleInfo = {
//           selects: [''],
//           type: '',
//           ids: new Set()
//         }
//         roleInfo.selects = []
//         roleInfo.type = 'ws_member+WORKSPACE'
//         const ids = state.ruleForm.groups.map((r: any) => r.type)
//         ids.forEach((id: string) => {
//           roleInfo.selects.push(id)
//         })
//         if (state.currentGroupWSIds.size > 0) {
//           roleInfo.ids = new Set()
//           state.currentGroupWSIds.forEach((item: any) => {
//             roleInfo.ids.add(item)
//           })
//         } else {
//           roleInfo.ids = new Set()
//         }
//         const groups = state.ruleForm.groups
//         groups.push(roleInfo)
//         state.currentWSGroupIndex = index + 1
//         _setResource(data, index + 1, 'WORKSPACE')
//       }
//     })
//   })
// }
// const checkRemove = (item: any, index: number) => {
//   if (!item.type) {
//     return true
//   }
//   const type = item.type.split('+')[1]
//   if (type === ws.value) {
//     let isHaveWorkspace = 0
//     let isHaveProject = 0
//     for (let i = 0; i < state.ruleForm.groups.length; i++) {
//       if (index === i) {
//         continue
//       }
//       const group = state.ruleForm.groups[i]
//       if (!group.type) {
//         continue
//       }
//       const _type = group.type.split('+')[1]
//       if (_type === ws.value) {
//         isHaveWorkspace += 1
//       }
//       if (_type === project.value) {
//         isHaveProject += 1
//       }
//       if (isHaveWorkspace === 0 && isHaveProject > 0) {
//         ElMessage.warning(i18n.global.t('commons.not_eligible_for_deletion'))
//         return false
//       } else {
//         state.currentGroupWSIds = new Set()
//       }
//     }
//     return true
//   }
// }
// const removeGroup = (item: any) => {
//   const index = state.ruleForm.groups.indexOf(item)
//   const isRemove = checkRemove(item, index)
//   if (!isRemove) {
//     return
//   }
//   if (item.type) {
//     const _type = item.type.split('+')[1]
//     if (_type === 'WORKSPACE') {
//       state.currentWSGroupIndex = -1
//     } else {
//       if (state.currentWSGroupIndex > index) {
//         state.currentWSGroupIndex = state.currentWSGroupIndex - 1
//       }
//     }
//   }
//   if (index !== -1) {
//     state.ruleForm.groups.splice(index, 1)
//   }
//   if (state.ruleForm.groups.length < state.userGroup.length) {
//     state.btnAddRole = false
//   }
// }
// const groupType = (idType: string) => {
//   if (!idType) {
//     return
//   }
//   return idType.split('+')[1]
// }
// const updateWorkSpace = (index: number, type: string) => {
//   const _type = type.split('+')[1]
//   if (_type === 'WORKSPACE') {
//     state.currentGroupWSIds.forEach(item => {
//       state.ruleForm.groups[index].ids.push(item)
//     })
//   } else {
//     state.ruleForm.groups[index].ids = []
//   }
// }
// const setWorkSpaceIds = (ids: [string], projects: any) => {
//   projects.forEach((project: any) => {
//     ids.forEach((item: string) => {
//       if (item === project.id) {
//         state.currentGroupWSIds.add(project.workspaceId)
//         if (state.ruleForm.groups[state.currentWSGroupIndex].ids.indexOf(project.workspaceId) === -1) {
//           state.ruleForm.groups[state.currentWSGroupIndex].ids.push(project.workspaceId)
//         }
//       }
//     })
//   })
// }
const getAllUserGroup = () => {
  getGroupByType({ type: GROUP_SYSTEM }).then(resp => {
    const data = resp.data
    if (data) {
      state.userGroup = data
    }
  })
}
const openDialog = (type: string, title: string, row?: any) => {
  state.type = type
  state.title = title
  if (type === 'Edit') {
    userGroupList(row.id).then(resp => {
      const data = resp.data
      state.ruleForm.groups = data
    })
    state.ruleForm = Object.assign({}, row)
  }
  dialogVisible.value = true
  getAllUserGroup()
}
defineExpose({ openDialog })
</script>
<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="state.title"
      width="30%"
      :close-on-click-modal="false"
      destroy-on-close
      @close="resetForm(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="state.ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item :label="$t('commons.username')" prop="name">
          <el-input
            v-model="state.ruleForm.name"
            autocomplete="off"
            :placeholder="$t('user.input_name')"
            class="form-input"
          />
        </el-form-item>
        <el-form-item :label="$t('commons.email')" prop="email">
          <el-input
            v-model="state.ruleForm.email"
            autocomplete="off"
            :placeholder="$t('user.input_email')"
            class="form-input"
          />
        </el-form-item>
        <el-form-item :label="$t('commons.phone')" prop="phone">
          <el-input
            v-model="state.ruleForm.phone"
            autocomplete="off"
            :placeholder="$t('user.input_phone')"
            class="form-input"
          />
        </el-form-item>
        <el-form-item v-if="state.type === 'Add'" :label="$t('commons.password')" prop="password">
          <el-input
            v-model="state.ruleForm.password"
            autocomplete="new-password"
            show-password
            :placeholder="$t('user.input_password')"
            class="form-input"
          />
        </el-form-item>

        <!-- <div v-for="(group, index) in state.ruleForm.groups" :key="index">
          <el-form-item
            :label="getLabel(index)"
            :prop="'groups.' + index + '.type'"
            :rules="{ required: true, message: i18n.global.t('user.select_group'), trigger: 'change' }"
          >
            <el-select
              v-model="group.type"
              filterable
              :placeholder="$t('user.select_group')"
              class="edit-user-select"
              :disabled="state.ruleForm.groups[index].type != null && state.ruleForm.groups[index].type !== ''"
              @change="getResource(group.type, index)"
            >
              <el-option
                v-for="item in activeGroup(group)"
                :key="item.id"
                :label="item.name"
                :value="item.id + '+' + item.type"
              />
            </el-select>
            <el-button
              v-if="state.ruleForm.groups.length > 1"
              style="margin-left: 20px"
              @click.prevent="removeGroup(group)"
            >
              {{ $t('commons.delete') }}
            </el-button>
          </el-form-item>
          <div v-if="groupType(group.type) === ws">
            <el-form-item
              :label="$t('commons.workspace')"
              :prop="'groups.' + index + '.ids'"
              :rules="{ required: true, message: $t('workspace.select'), trigger: 'change' }"
            >
              <el-select
                v-model="group.ids"
                filterable
                :placeholder="$t('workspace.select')"
                multiple
                class="edit-user-select"
                @change="updateWorkSpace(group.index, group.type)"
              >
                <el-option v-for="item in group.workspaces" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div v-if="groupType(group.type) === project">
            <el-form-item
              :label="$t('commons.project')"
              :prop="'groups.' + index + '.ids'"
              :rules="{ required: true, message: $t('user.select_project'), trigger: 'change' }"
            >
              <el-select
                v-model="group.ids"
                filterable
                :placeholder="$t('user.select_project')"
                multiple
                class="edit-user-select"
                @change="setWorkSpaceIds(group.ids, group.projects)"
              >
                <el-option v-for="item in group.projects" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </div>
        </div> -->
        <el-form-item>
          <template #default>
            <el-button type="success" class="form-input" :disabled="state.btnAddRole" @click="addGroup(ruleFormRef)">
              {{ $t('group.add') }}
            </el-button>
          </template>
        </el-form-item>
      </el-form>

      <template #footer>
        <n-dialog-footer @cancel="resetForm(ruleFormRef)" @confirm="submitForm(ruleFormRef)" />
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
.form-input {
  width: 80%;
}

.edit-user-select {
  width: 80%;
}
</style>
