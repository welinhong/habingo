import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useState } from 'react'
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, View, TextInputChangeEventData } from 'react-native'
import { theme } from '../styles/theme'
import { BingoStackList } from '../types'
import StackHeader from '../components/mocules/StackHeader/index'
import TextFied from '../components/mocules/TextField'

export interface Props {
  route: RouteProp<BingoStackList, 'BingoAddForm'>
  navigation: DrawerNavigationProp<BingoStackList, 'BingoAddForm'>
}

const BingoAddFormScreen: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = useState('')

  const handleBackButtonPress = () => {
    navigation.goBack()
  }

  const handleInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    console.log(e.target)
    
  }

  return (
    <SafeAreaView style={styles.BingoAddFormScreen}>
      <View>
        {/* header */}
        <StackHeader title="New" onPress={handleBackButtonPress} />
d
        {/* input */}
        <TextFied value={value} onChange={handleInputChange} />

        {/* options */}

        {/* buttons */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  BingoAddFormScreen: {
    // flex: 1,
    // backgroundColor: theme.color.background
  },
})

export default BingoAddFormScreen
