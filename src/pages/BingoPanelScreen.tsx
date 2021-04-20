/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BingoBox from '../components/atoms/BingoBox'
import theme from '../styles/theme'
import { TabParamList } from '../types'

interface Props {
  route: RouteProp<TabParamList, 'BingoPanel'>
  navigation: DrawerNavigationProp<TabParamList, 'BingoPanel'>
}

const BingoPanelScreen: React.FC<Props> = ({ route, navigation }) => {
  const items = route?.params?.items || []
  const userName = 'Welin'
  const [bingos, setBingos] = useState([
    {type: 'a', color: 'lightyellow', value: null},
    {type: 'b', color: 'lightyellow', value: null},
    {type: 'c', color: 'lightyellow', value: null},
    {type: 'd', color: 'lightyellow', value: null},
    {type: 'e', color: 'lightyellow', value: null},
    {type: 'f', color: 'lightyellow', value: null},
    {type: 'a', color: 'lightyellow', value: null},
    {type: 'b', color: 'lightyellow', value: null},
    {type: 'c', color: 'lightyellow', value: null},
  ])

  // TODO: API 추가하면 아래 effect 제거하기
  useEffect(() => {
    if(!items.length) return

    setBingos((bingos) => {
      const newBingos = bingos.map((bingo, index) => ({
        ...bingo,
        value: items[index] || null
      }))
      return newBingos
    })
  }, [items])

  const handleMenuPress = () => {
    navigation.openDrawer()
  }

  const handleInputPress = () => {
    navigateToAddItemsPage()
  }

  const handleFillupPress = () => {
    navigateToAddItemsPage()
  }

  const navigateToAddItemsPage = () => {
    navigation.navigate('BingoNewItemsPanel')
  }

  return (
    <SafeAreaView style={styles.bingoPanel}>
      <View style={styles.bingoScreen}>
        <View style={styles.header}>
          <Text style={styles.title}>HaBingo</Text>
          {/* <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress} >
            <Text>menu</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.introMessageBox}>
          <Text style={styles.introMessage}>
            Hi {userName},
          </Text>
          <Text style={styles.introMessage}>
            Lets start!
          </Text>
        </View>

        <Pressable style={styles.fillupButton} onPress={handleFillupPress}>
          <Text style={styles.fillupTitle}>Fill up your bingo.</Text>
          <Text style={styles.fillupMessage}>You can start the game by completeing nine.</Text>
        </Pressable>

        <View style={styles.bingoContainer}>
          {bingos.map(({ type, color, value }, index) => (
            <BingoBox type={type} key={index}>
              { value && <Text>{ value }</Text> }
              { !value && 
                <TouchableOpacity onPress={handleInputPress}>
                  <Text style={styles.placeholder}>plz input your habit</Text>
                </TouchableOpacity>
              }
            </BingoBox>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bingoScreen: {
    padding: 15,
  },
  bingoPanel: {
    flex: 1,
    backgroundColor: '#faf5e1',
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  menuButton: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
  },
  introMessageBox: {
    marginBottom: 15,
  },
  introMessage: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  fillupButton: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    backgroundColor: theme.color.yellow,
  },
  fillupTitle: {
    fontSize: theme.typography.h3,
    marginBottom: 5
  },
  fillupMessage: {
    fontSize: theme.typography.body2
  },
  bingoContainer: {
    display: 'flex',
    width: 345,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  placeholder: {
    color: 'grey'
  },
  inputButtonText: {
    color: '#666666',
  },
})

export default BingoPanelScreen
