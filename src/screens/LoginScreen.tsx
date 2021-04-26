import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { RootStackParamList } from '../types'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

const LoginScreen: React.FC<Props> = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default LoginScreen
