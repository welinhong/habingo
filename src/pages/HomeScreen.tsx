/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
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
      <Text>Hello guys!</Text>
      <Text>This is Habi(t)go.</Text>
      <Button title="Let's do Bingo!" onPress={() => navigation.navigate('BingoPanel')} />
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
