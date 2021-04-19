/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { ComponentType } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native'
import { FlingGestureHandler, TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'
import BingoBox from '../components/atoms/BingoBox'
import { TabParamList } from '../types'

interface Props {
  route: RouteProp<TabParamList, 'BingoPanel'>
  navigation: DrawerNavigationProp<TabParamList, 'BingoPanel'>
}

const BingoPanelScreen: React.FC<Props> = ({ route, navigation }) => {
  const items = route?.params?.items || []
  const bingos = [
    {type: 'a', color: 'lightyellow', value: null},
    {type: 'b', color: 'lightyellow', value: null},
    {type: 'c', color: 'lightyellow', value: null},
    {type: 'd', color: 'lightyellow', value: null},
    {type: 'e', color: 'lightyellow', value: null},
    {type: 'f', color: 'lightyellow', value: null},
    {type: 'a', color: 'lightyellow', value: null},
    {type: 'b', color: 'lightyellow', value: null},
    {type: 'c', color: 'lightyellow', value: null},
  ]

  const handleMenuPress = () => {
    navigation.openDrawer()
  }

  const handleInputPress = () => {
    navigation.navigate('BingoNewItemsPanel')
  }

  return (
    <SafeAreaView style={styles.bingoPanel}>
      <View style={styles.header}>
        <Text style={styles.title}>HaBingo</Text>
        {/* <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress} >
          <Text>menu</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.bingoContainer}>
        {bingos.map(({ type, color, value }, index) => (
          <BingoBox type={type} key={index}>
            { value && <Text>{ value }</Text> }
            { !value && 
              <TouchableOpacity onPress={handleInputPress}>
                <Text>plz input your habit</Text>
              </TouchableOpacity>
            }
          </BingoBox>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bingoPanel: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#faf5e1'
  },
  title: {
    fontSize: 36,
    // padding: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  header: {
    display: 'flex',
    position: 'relative',
    // justifyContent: 'center'
  },
  menuButton: {
    // backgroundColor: 'red',
    // position: 'absolute',
    // top: 0,
    // right: 0,
  },
  bingoContainer: {
    display: 'flex',
    width: 330,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputButton: {},
  inputButtonText: {
    color: '#666666',
  },
})

export default BingoPanelScreen
