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
  TouchableOpacity
} from 'react-native'
import BingoBox from '../components/atoms/BingoBox'
import { theme } from '../styles/theme'
import { BingoStackList } from '../types'
import MenuIcon from '../../assets/icons/menu.svg'

interface Props {
  route: RouteProp<BingoStackList, 'BingoBoard'>
  navigation: DrawerNavigationProp<BingoStackList, 'BingoBoard'>
}

const BingoBoardScreen: React.FC<Props> = ({ route, navigation }) => {
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
    showKeyboard()
  }

  // TODO: 키보드 뜨고
  // 입력완료하면 해당 빙고 아이템에 텍스트가 붙는다
  const showKeyboard = () => {}

  return (
    <SafeAreaView style={styles.BingoBoardScreenWrap}>
      <View style={styles.BingoBoardScreen}>
        <View style={styles.header}>
          <Text style={styles.title}>
            HaBingo
          </Text>
          <Pressable style={styles.menuButton} onPress={handleMenuPress}>
            <MenuIcon />
          </Pressable>
        </View>

        <View style={styles.introMessageBox}>
          <Text style={styles.introMessage}>
            Hi {userName},
          </Text>
          <Text style={styles.introMessage}>
            Lets start!
          </Text>
        </View>

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
  BingoBoardScreen: {
    padding: 15,
  },
  BingoBoardScreenWrap: {
    flex: 1,
    backgroundColor: '#faf5e1',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    right: 0,
  },
  introMessageBox: {
    marginBottom: 15,
  },
  introMessage: {
    fontSize: 24,
    fontWeight: 'bold'
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

export default BingoBoardScreen
