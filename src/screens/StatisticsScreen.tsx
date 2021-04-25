import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import React, { ComponentType } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native'
import { TabParamList } from '../types'


interface Props {
  navigation: BottomTabNavigationProp<TabParamList, 'Statistics'>
}

const HomeScreen: ComponentType<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.homeScreen}>
      <Text>Statistics</Text>
      <Button title="Go To Main Screen" onPress={() => navigation.navigate('BingoPanel')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HomeScreen
