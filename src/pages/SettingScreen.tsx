/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native'
import { RootStackParamList } from '../types'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Settings'>
}

const SettingScreen: React.FC<Props> = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default SettingScreen
