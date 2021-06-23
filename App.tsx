import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './src/navigators/MainNavigator';
import SettingScreen from './src/screens/SettingScreen';
import LoginScreen from './src/screens/LoginScreen';
import { useAuth } from './src/hooks/useAuth';
import { AuthContext } from './src/contexts/AuthContext';
import { UserContext } from './src/contexts/UserContext';

const Stack = createStackNavigator();

const App = () => {
  const { auth, state } = useAuth()
  
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
      {state?.user ? (
        <UserContext.Provider value={state?.user}>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Settings" component={SettingScreen} />
          </Stack.Navigator>
        </UserContext.Provider>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
