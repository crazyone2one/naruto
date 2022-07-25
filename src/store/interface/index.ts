/* themeConfigProp */
export interface ThemeConfigProp {
  primary: string
  breadcrumb: boolean
  tabs: boolean
  isCollapse: boolean
}

/* GlobalState */
export interface GlobalState {
  assemblySize: string
  language: string
  themeConfig: ThemeConfigProp
}
export interface userInfos {
  token: string | null
  lastWorkspaceId: string | null
  lastProjectId: string | null
  userInfo: any
}
// /* MenuState */
// export interface MenuState {
//   isCollapse: boolean
//   menuList: Menu.MenuOptions[]
// }

// /* TabsState */
// export interface TabsState {
//   tabsMenuValue: string
//   tabsMenuList: Menu.MenuOptions[]
// }
