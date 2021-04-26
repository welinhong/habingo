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
  BingoStack: NavigatorScreenParams<BingoStackList>
  Statistics: undefined
}

export type BingoStackList = {
  BingoBoard: undefined
  BingoAddForm: undefined
}
