/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import StatsScreen from './src/pages/HomeScreen';
import BingoPanelScreen from './src/pages/BingoPanelScreen';
import BingoNewItemsScreen from './src/pages/BingoNewItemsScreen';
import SettingScreen from './src/pages/SettingScreen';
import LoginScreen from './src/pages/LoginScreen';

export interface Props {
  name: string;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 참고하기: https://github.com/react-navigation/react-navigation/blob/16e7ac131f2ebde23cfe6dabc55a1c91327ffa56/example/src/Screens/MasterDetail.tsx

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

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="BingoPanel" component={BingoPanelScreen} />
      <Tab.Screen name="BingoNewItemsPanel" component={BingoNewItemsScreen} />
      <Tab.Screen name="Statistics" component={StatsScreen} />
    </Tab.Navigator>
  );
}

function DrawerContainer() {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      drawerType="slide"
      drawerPosition="right"
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Tabs" component={Tabs} />
    </Drawer.Navigator>
  );
}

// TODO: https://reactnavigation.org/docs/handling-safe-area 여기서부터
// 메뉴바 + 탭 콤비네이션 구현: 아래 링크 참고하기
// https://shockoe.com/ideas/development/how-to-combine-bottom-tabs-top-tabs-and-a-hamburger-menu-in-a-react-native-application/
const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Drawer">
          <Stack.Screen
            name="Drawer"
            component={DrawerContainer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Settings" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
