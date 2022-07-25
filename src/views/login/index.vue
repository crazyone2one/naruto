<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { Login } from './interface'
import { useRouter } from 'vue-router'
import { useUserInfo } from '@/store/modules/userInfo'

const userInfo = useUserInfo()
const router = useRouter()
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const loginForm = reactive<Login.ReqLoginForm>({
  username: '',
  password: ''
})
const loginFormRef = ref<FormInstance>()
const onSubmit = () => {
  userInfo.setToken('123')
  router.push({ name: 'dashboard' })
}
</script>
<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/images/login_left0.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <p class="logo-text">Naruto</p>
        </div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="normal">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名：admin / user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="Please input password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import './index.scss';
</style>
