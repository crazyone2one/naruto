import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// https://router.vuejs.org/guide/

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      requiresAuth: false,
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
      requiresAuth: false,
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

// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | Naruto `
//   const role = localStorage.getItem('ms_username')
//   if (!role && to.path !== '/login') {
//     next('/login')
//   } else if (to.meta.permission) {
//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//     role === 'admin' ? next() : next('/403')
//   } else {
//     next()
//   }
// })

export default router
