<script setup lang="ts">
import { FormInstance, ElMessage } from 'element-plus'
import { UserFilled, User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { Login } from './interface'
import { useRouter } from 'vue-router'
import { useUserInfo } from '@/store/modules/userInfo'
import i18n from '@/i18n'
import { loginApi } from '@/api/modules/login'

const userInfo = useUserInfo()
const router = useRouter()
const loginRules = reactive({
  name: [
    { required: true, message: i18n.global.t('commons.input_login_username'), trigger: 'blur' }
  ],
  password: [{ required: true, message: i18n.global.t('commons.input_password'), trigger: 'blur' }]
})
const loginForm = reactive<Login.ReqLoginForm>({
  name: '',
  password: ''
})
const loading = ref<boolean>(false)
const loginFormRef = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      try {
        loginApi(loginForm).then(res => {
          userInfo.setToken(res.data?.token)
          userInfo.setLastProjectId(res.data?.user.lastProjectId)
          userInfo.setLastWorkspaceId(res.data?.user.lastWorkspaceId)
          userInfo.setUserInfo(res.data?.user)
          ElMessage.success(i18n.global.t('ldap.login_success'))
          router.push({ name: 'dashboard' })
        })
      } finally {
        loading.value = false
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <p class="logo-text">Naruto</p>
        </div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
          <el-form-item prop="name">
            <el-input
              v-model="loginForm.name"
              :placeholder="$t('commons.login_username')"
              autocomplete="off"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              :placeholder="$t('commons.password')"
              show-password
              :prefix-icon="Lock"
            />
          </el-form-item>
        </el-form>
        <div class="login-btn">
          <el-button
            type="primary"
            round
            size="large"
            :loading="loading"
            :icon="UserFilled"
            @click="submitForm(loginFormRef)"
            >{{ $t('commons.login') }}</el-button
          >
          <!-- <el-button>取消</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import './index.scss';
</style>
