import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserInfo } from '@/store/modules/userInfo'
import setting from './modules/setting'
import project from './modules/project'
import i18n from '@/i18n'

// https://router.vuejs.org/guide/

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      permission: false,
      title: 'commons.login',
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
          title: 'workstation.dash_board',
          permission: true
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/home/index.vue')
      }
    ]
  },
  setting,
  project,
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
  const _title: string = to.meta.title ? (to.meta.title as string) : ''
  document.title = `${i18n.global.t(_title)} | Naruto `
  // * 判断当前路由是否需要访问权限
  if (!to.matched.some(record => record.meta.permission)) return next()
  // * 判断是否有Token
  const userInfo = useUserInfo()
  if (!userInfo.token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
