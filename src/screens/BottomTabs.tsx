import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react';
import { StyleSheet } from 'react-native'
import BingoNewItemsScreen from './AddFormScreen';
import BingoPanelScreen from './BingoScreen';
import StatisticsScreen from './StatisticsScreen';

export interface Props {}

const Tab = createBottomTabNavigator();
const BottomTabs: React.FC<Props> = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="BingoPanel" component={BingoPanelScreen} />
      <Tab.Screen name="BingoNewItemsPanel" component={BingoNewItemsScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

export default BottomTabs
