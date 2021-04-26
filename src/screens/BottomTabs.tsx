import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react';
import { StyleSheet } from 'react-native'
import BingoStack from './BingoStack';
import StatisticsScreen from './StatisticsScreen';

export interface Props {}

const Tab = createBottomTabNavigator();
const BottomTabs: React.FC<Props> = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="BingoStack" component={BingoStack} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

export default BottomTabs
