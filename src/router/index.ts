import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserInfo } from '@/store/modules/userInfo'

// https://router.vuejs.org/guide/

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      permission: false,
      title: '登录页',
      key: 'login'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页'
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      permission: false,
      title: '404',
      key: '404'
    }
  },
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: { name: '404' }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Naruto `
  // * 判断当前路由是否需要访问权限
  if (!to.matched.some(record => record.meta.permission)) return next()
  // * 判断是否有Token
  const userInfo = useUserInfo()
  const token = userInfo.token

  if (!token && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // todo 权限设置
    userInfo.userInfo.name === 'admin' ? next() : next('/403')
  } else {
    next()
  }
})

export default router
