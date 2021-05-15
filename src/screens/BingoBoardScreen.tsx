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
  TextInput,
  Button
} from 'react-native'
import BingoBox from '../components/atoms/BingoBox'
import { BingoStackList } from '../types'
import MenuIcon from '../../assets/icons/menu.svg'
import { theme } from '../styles/theme'
import MessegeBox from '../components/atoms/MessegeBox'

interface Props {
  route: RouteProp<BingoStackList, 'BingoBoard'>
  navigation: DrawerNavigationProp<BingoStackList, 'BingoBoard'>
}

const BingoBoardScreen: React.FC<Props> = ({ route, navigation }) => {
  const [start, setStart] = useState(false)
  const [selectedBingobox, setSelectedBingobox] = useState(null)
  const [isAllBingoFilled, setIsAllBingoFilled] = useState(false)
  const [unfilledBingoNumber, setUnFilledBingoNumber] = useState(0)

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

  const handleMenuPress = () => {
    navigation.openDrawer()
  }

  const handleStartButtonPress = () => {
    setStart(!start)
  }

  const handleTextChange = (index: number) => (text: string) => {
    const value = text
    
    setBingos((prevBingos) => {
      const updated = prevBingos.map((bingo, bingoIndex) => {
        return index === bingoIndex ? {
          ...bingo,
          value,
        }: {...bingo}
      })
      return updated
    })
  }

  const handleLongPress = (index: number) => {
    setSelectedBingobox(index)
  }


  // 모든 빙고값이 다 채워져 있는지 확인
  useEffect(() => {
    const isFilled = bingos.every((bingo) => bingo.value)
    setIsAllBingoFilled(isFilled)

    const unfilledBingoNumbers = bingos.filter((bingo) => !bingo.value).length
    setUnFilledBingoNumber(unfilledBingoNumbers)
  }, [bingos])

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

        <MessegeBox
          title="Fill up your bingo."
          messege={`You can start the game by completing ${unfilledBingoNumber} ${unfilledBingoNumber > 1 ? 'boxes' : 'box' }`}
        />

        <View style={styles.bingoContainer}>
          {bingos.map(({ type, color, value }, index) => (
            <Pressable key={index} onLongPress={() => handleLongPress(index)}>
              <BingoBox type={type} highlight={selectedBingobox === index}>
                { start && <Text>{value}</Text> }
                { !start && (
                  <TextInput
                    value={value} 
                    placeholder="plz input your habit" 
                    multiline 
                    onChangeText={handleTextChange(index)}
                  />
                ) }
              </BingoBox>
            </Pressable>
          ))}
        </View>

        {isAllBingoFilled && <Button title={start ? "중지" : "시작하기"} onPress={handleStartButtonPress} />}
        {start && <Text style={styles.messege}>시작되었습니다</Text>}
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
    backgroundColor: theme.color.background,
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
    color: theme.color.mainFont,
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
    fontWeight: 'bold',
    color: theme.color.mainFont,
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
  messege: {
    textAlign: 'center'
  }
})

export default BingoBoardScreen
