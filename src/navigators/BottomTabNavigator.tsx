import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react';
import { StyleSheet, View } from 'react-native'
import { theme } from '../styles/theme';
import BingoStack from './BingoStackNavigator';
import StatisticsScreen from '../screens/StatisticsScreen';
import BingoBoardIcon from '../../assets/icons/board.svg'
import ChartIcon from '../../assets/icons/chart.svg'

export interface Props {}

const Tab = createBottomTabNavigator();
const BottomTabs: React.FC<Props> = () => {
  return (
    <Tab.Navigator tabBarOptions={{
      style: styles.tabBar,
      showLabel: false,
    }}>
      <Tab.Screen 
        name="BingoStack"
        component={BingoStack}
        options={{
          title: 'Board',
          tabBarIcon: ({ focused }) => (
            <IconWrapper focused={focused}>
              <BingoBoardIcon />
            </IconWrapper>)
        }}
      />
      <Tab.Screen 
        name="Statistics" 
        component={StatisticsScreen} 
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => (
            <IconWrapper focused={focused}>
              <ChartIcon />
            </IconWrapper>
          )
        }}
      />
    </Tab.Navigator>
  )
}


interface IconWrapperProps {
  focused: boolean
}
const IconWrapper: React.FC<IconWrapperProps> = ({ focused, children }) => {
  return focused ?
    <View style={styles.iconWrapper}>
      { children }
    </View>
  :
    <>{children}</>
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.color.black,
    borderTopColor: theme.color.black,
  },
  iconWrapper: {
    borderBottomColor: theme.color.deepyellow,
    borderBottomWidth: 2,
    marginBottom: -2,
  }
})

export default BottomTabs
