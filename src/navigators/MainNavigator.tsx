import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import BottomTabs from './BottomTabNavigator'

export interface Props {}

const Drawer = createDrawerNavigator()
const Main: React.FC<Props> = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerType="slide"
      drawerPosition="right"
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Tabs" component={BottomTabs} />
    </Drawer.Navigator>
  )
}

const CustomDrawerContent = (props: DrawerContentComponentProps<DrawerContentOptions>) => {
  const {navigation} = props;

  const handleNavigation = (screenName: string) => {
    navigation.navigate(screenName);
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Button title="Close" onPress={() => navigation.toggleDrawer()} />
      </View>
      <DrawerItem
        label="Settings"
        onPress={() => handleNavigation('Settings')}
      />
      <DrawerItem label="Logout" onPress={() => handleNavigation('Login')} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({})

export default Main
