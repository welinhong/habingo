import { AuthContext } from '../../src/contexts/AuthContext'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import BottomTabs from './BottomTabNavigator'

export interface Props {}

const Drawer = createDrawerNavigator()
const Main: React.FC<Props> = () => {
  const auth = useContext(AuthContext)
  const handleLogout = (): Promise<void> => {
    return auth.logout()
  }
  
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerType="slide"
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawerContent {...props} onLogout={handleLogout} />}>
      <Drawer.Screen name="Tabs" component={BottomTabs} />
    </Drawer.Navigator>
  )
}

interface DrawerContentProps extends DrawerContentComponentProps<DrawerContentOptions> {
  onLogout: () => Promise<void>
} 
const CustomDrawerContent = (props: DrawerContentProps) => {
  const { navigation, onLogout } = props;

  const handleNavigation = (screenName: string) => {
    navigation.navigate(screenName);
    navigation.closeDrawer();
  };

  const handleLogout = async () => {
    await onLogout()
  }

  return (
    <DrawerContentScrollView>
      <View>
        <Button title="Close" onPress={() => navigation.toggleDrawer()} />
      </View>
      <DrawerItem
        label="Settings"
        onPress={() => handleNavigation('Settings')}
      />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({})

export default Main
