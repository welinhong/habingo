/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import { NavigatorScreenParams } from '@react-navigation/core'
import React, { ComponentType } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native'

// TODO: HomeScreen Type 정의하는 것부터 하기
const HomeScreen = ({ navigation }) => {
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
