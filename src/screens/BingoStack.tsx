import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import BingoAddFormScreen from './BingoAddFormScreen'
import BingoBoardScreen from './BingoBoardScreen'

export interface Props {}

const Stack = createStackNavigator()
const BingoStack: React.FC<Props> = () => {
  return (
    <Stack.Navigator initialRouteName="BingoBoard">
      <Stack.Screen
        name="BingoBoard" 
        component={BingoBoardScreen} 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="BingoAddForm" 
        component={BingoAddFormScreen} 
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})

export default BingoStack
