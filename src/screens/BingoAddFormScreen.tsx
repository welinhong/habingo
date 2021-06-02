import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
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

  const handleInputChange = (text: string) => {
    setValue(text)
  }

  const handleSavePress = () => {}
  const handleCancelPress = () => {}

  return (
    <SafeAreaView style={styles.BingoAddFormScreen}>
      <StackHeader title="New" onPress={handleBackButtonPress} />
      <View style={styles.container}>
        <TextFied 
          value={value} 
          onChange={handleInputChange} 
          placeholder="이루고 싶은 습관을 입력해주세요."
        />
        <Text style={styles.description}>
          또는 아래 옵션을 선택해주세요.
        </Text>

        {/* options */}
        {/* 
          크게 두가지로 이루어져 있다 - Action + Times 
          Action 선택하면 Time을 선택할 수 있도록
        */}
        {/* <View style={styles.options}>
          <Text>옵션목록이 들어갈 자리</Text>
        </View> */}


        {/* buttons */}
        <View>
          <Button title="Cancel" onPress={handleCancelPress}/>
          <Button title="Save" onPress={handleSavePress}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  BingoAddFormScreen: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  container: {
    padding: 15,
    display: 'flex',
  },
  description: {
    ...theme.typography.body1,
    color: 'grey',
    padding: 20,
    textAlign: 'center',
  },
  options: {
    // flex: 1,
  }
})


export default BingoAddFormScreen
