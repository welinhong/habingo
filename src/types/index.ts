import { NavigatorScreenParams } from '@react-navigation/core'

export type RootStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList>
  Login: undefined
  Settings: undefined
}

export type DrawerParamList = {
  Tabs: NavigatorScreenParams<TabParamList>
}

export type TabParamList = {
  BingoPanel: undefined
  BingoNewItemsPanel: undefined
  Statistics: undefined
}

export type BingoPanelParamList = {
  items: string[]
}
