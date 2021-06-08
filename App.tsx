import 'react-native-gesture-handler';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './src/navigators/MainNavigator';
import SettingScreen from './src/screens/SettingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ApiService from './src/services/ApiService';

const Stack = createStackNavigator();
const api = new ApiService({
  baseURL: 'http://habingo-env.eba-euxjxc2f.ap-northeast-2.elasticbeanstalk.com'
})

export const ApiContext = createContext(api)
const App = () => {
  const apiContext = useContext(ApiContext)
  
  return (
    <ApiContext.Provider value={apiContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Settings" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
