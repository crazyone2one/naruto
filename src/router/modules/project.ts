export default {
  path: '/project',
  name: 'Project',
  component: () => import('@/components/layout/index.vue'),
  children: [
    {
      path: '',
      name: 'ProjectSettingHome',
      meta: {
        title: 'project.manager',
        permission: true
      },
      component: () => import(/* webpackChunkName: "ProjectSettingHome" */ '@/views/project/ProjectSetting.vue'),
      children: [
        {
          path: '',
          name: 'ProjectSettingHome',
          meta: {
            title: 'project.manager',
            permission: true
          },
          component: () => import(/* webpackChunkName: "ProjectSettingHome" */ '@/views/project/home/index.vue')
        },
        {
          path: 'template',
          name: 'template',
          meta: {
            title: 'custom_field.template_setting',
            system: true,
            permission: true
          },
          component: () => import(/* webpackChunkName: "template" */ '@/views/project/template/index.vue')
        }
        // {
        //   path: 'user',
        //   name: 'user',
        //   meta: {
        //     title: 'commons.user',
        //     system: true,
        //     permission: true
        //   },
        //   component: () =>
        //     import(/* webpackChunkName: "workspace" */ '@/views/settings/system/SystemUser.vue')
        // },
        // {
        //   path: 'project/:type',
        //   name: 'project',
        //   meta: {
        //     title: 'project.manager',
        //     workspace: true,
        //     permission: true
        //   },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "workspace" */ '@/views/settings/workspace/SystemProject.vue'
        //     )
        // }
      ]
    }
  ]
}
