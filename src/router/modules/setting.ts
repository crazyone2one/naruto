export default {
  path: '/setting',
  name: 'setting',
  component: () => import('@/components/layout/index.vue'),
  children: [
    {
      path: '',
      name: 'SettingHome',
      meta: {
        title: 'commons.setting',
        permission: true
      },
      component: () => import(/* webpackChunkName: "SettingHome" */ '@/views/settings/index.vue'),
      children: [
        {
          path: '',
          name: 'SettingHome',
          meta: {
            title: 'commons.setting',
            permission: true
          },
          component: () =>
            import(/* webpackChunkName: "SettingHome" */ '@/views/settings/SettingHome.vue')
        },
        {
          path: 'systemworkspace',
          name: 'workspace',
          meta: {
            title: 'commons.workspace',
            system: true,
            permission: true
          },
          component: () =>
            import(
              /* webpackChunkName: "workspace" */ '@/views/settings/system/SystemWorkspace.vue'
            )
        },
        {
          path: 'user',
          name: 'user',
          meta: {
            title: 'commons.user',
            system: true,
            permission: true
          },
          component: () =>
            import(/* webpackChunkName: "workspace" */ '@/views/settings/system/SystemUser.vue')
        },
        {
          path: 'project/:type',
          name: 'project',
          meta: {
            title: 'project.manager',
            workspace: true,
            permission: true
          },
          component: () =>
            import(
              /* webpackChunkName: "workspace" */ '@/views/settings/workspace/SystemProject.vue'
            )
        }
      ]
    }
  ]
}
