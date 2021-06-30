/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  Keyboard,
  TouchableWithoutFeedback,
  GestureResponderEvent
} from 'react-native'
import { UserContext } from '../../src/contexts/UserContext'
import { BingoStackList } from '../../src/types'
import { theme } from '../../src/styles/theme'
import BingoBox from '../../src/components/atoms/BingoBox'
import MessegeBox, { MessageBoxColor } from '../../src/components/atoms/MessegeBox'
import DashedButton from '../../src/components/mocules/DashedButton'
import MenuIcon from '../../assets/icons/menu.svg'
import { useBingoService } from '../hooks/useBingoService'
import InvitationPopup from '../../src/components/organisms/InvitationPopup'
import { useBingoRoomService } from '../../src/hooks/useBingoRoomService'
import Header from '../../src/components/mocules/Header'

interface Props {
  route: RouteProp<BingoStackList, 'BingoBoard'>
  navigation: DrawerNavigationProp<BingoStackList, 'BingoBoard'>
}

const BingoBoardScreen: React.FC<Props> = ({ route, navigation }) => {
  const user = useContext(UserContext)
  const bingoService = useBingoService()
  const bingoRoomService = useBingoRoomService()
  
  const [isAllBingoFilled, setIsAllBingoFilled] = useState(false)
  const [unfilledBingoNumber, setUnFilledBingoNumber] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const [bingoInfo, setBingoInfo] = useState({
    id: undefined,
    bingoRoomId: undefined
  })
  const [bingoRoomInfo, setBingoRoomInfo] = useState<{id: number | undefined, inviteCode: string | undefined}>({
    id: undefined,
    inviteCode: undefined
  })

  const userName = user.name

  const [bingoItems, setBingoItems] = useState([
    {id: null, value: null, seq: null, done: false, type: 'a', color: 'lightyellow'},
    {id: null, value: null, seq: null, done: false, type: 'b', color: 'lightyellow'},
    {id: null, value: null, seq: null, done: false, type: 'c', color: 'lightyellow'},
    {id: null, value: null, seq: null, done: false, type: 'd', color: 'lightyellow'},
    {id: null, value: null, seq: null, done: false, type: 'e', color: 'lightyellow'},
    {id: null, value: null, seq: null, done: false, type: 'f', color: 'lightyellow'},
    {id: null, value: null, seq: null, done: false, type: 'a', color: 'lightyellow'},
    {id: null, value: null, seq: null, done: false, type: 'b', color: 'lightyellow'},
    {id: null, value: null, seq: null, done: false, type: 'c', color: 'lightyellow'},
  ])

  const handleMenuPress = () => {
    navigation.openDrawer()
  }

  const handleStartButtonPress = useCallback(async () => {
    if (!isAllBingoFilled) return
    Keyboard.dismiss()
  }, [isAllBingoFilled])

  const handleTextChange = (index: number) => (text: string) => {
    const value = text
    
    setBingoItems((prevBingos) => {
      const updated = prevBingos.map((bingo, bingoIndex) => {
        return index === bingoIndex ? {
          ...bingo,
          value,
        }: {...bingo}
      })
      return updated
    })
  }

  // 친구 추가 버튼 - 팝업을 띄운다
  const handleFriendAddButtonPress = async () => {
    // 팝업 띄우기
    setIsPopupOpen(true)

    // check if there is bingoRoomId, then set inviteCode
    try {
      if (bingoInfo?.bingoRoomId) {
        const bingoRoomInfo = await bingoRoomService.getDetail(bingoInfo.bingoRoomId!)
        setBingoRoomInfo({
          id: bingoRoomInfo?.id,
          inviteCode: bingoRoomInfo?.inviteCode,
        })
      } else {
        const bingoRoomInfo = await bingoRoomService.createBingoRoom(bingoInfo.id!)
        setBingoRoomInfo({
          id: bingoRoomInfo?.id,
          inviteCode: bingoRoomInfo?.inviteCode,
        })
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  // Done item or Clear Done item
  const handleBingoItemPress = (id: number) => async (event: GestureResponderEvent) => {
    // check if item is done
    const selectedItem = bingoItems.find((item) => item.id === id)
    if (selectedItem?.done) {
      await bingoService.cancelItemDone(bingoInfo.id!, id)
    } else {
      await bingoService.doneItem(bingoInfo.id!, id)
    }

    setBingoItems((oldBingoItems) => {
      return oldBingoItems.map((item) => {
        if (item.id !== id) return item
        return {
          ...item,
          done: !selectedItem?.done
        }
      })
    })
  }
  
  const handleOnEndEditing = (index: number) => async (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    const value = e.nativeEvent.text
    if (!value) return
    const newBingoItems = await bingoService.addItem(bingoInfo.id!, value)
    updateBingoItems(newBingoItems)
  }

  const updateBingoItems = (newBingoItems: any) => {
    setBingoItems((oldBingoItems) => {
      const updated = oldBingoItems.map((item, index) => {
        if (!newBingoItems[index]) return item
        const { id, seq, contents, todayHistory: { done } } = newBingoItems[index]
        return {
          ...item,
          id,
          seq,
          value: contents,
          done
        }
      })
      return updated
    })
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false)
  }

  // 빙고 데이터 불러오기
  useEffect(() => {
    const getBingoDetail = async () => {
      // 빙고 리스트 호출
      const { latestBingoId, latestBingoBingoRoomId } = await bingoService.getList()

      if (latestBingoId) {
        setBingoInfo({
          id: latestBingoId,
          bingoRoomId: latestBingoBingoRoomId
        })

        // 있다면, 가장 최근의 빙고를 가져와서 보여준다
        const bingo = await bingoService.getDetail(latestBingoId)

        // bingo.bingoItems seq 순서대로 정렬하기
        bingo.bingoItems.sort((a: any, b: any) => a.seq - b.seq)

        // 빙고 데이터 셋팅
        updateBingoItems(bingo?.bingoItems)
      } else {
        // 없다면, 새로운 빙고를 생성한다
        const { id, bingoRoomId } = await bingoService.addOne()
        setBingoInfo({
          id,
          bingoRoomId
        })
      }
    }

    getBingoDetail()
  }, [])

  // 모든 빙고값이 다 채워져 있는지 확인
  useEffect(() => {
    const unfilledBingoNumbers = bingoItems.filter((bingo) => !bingo.value).length
    setUnFilledBingoNumber(unfilledBingoNumbers)
    
    const isFilled = unfilledBingoNumber === 0
    setIsAllBingoFilled(isFilled)
  }, [bingoItems])

  // 빙고 아이템이 모두 추가되었는지 확인 - 게임 시작 여부를 결정한다
  useEffect(() => {
    const start = bingoItems.every((item) => !!item.id)
    setIsStarted(start)
  }, [bingoItems])

  return (
    <>
    {/* TODO: api 호출해서 invitation code 넣어주기 */}
    <InvitationPopup
      invitationCode={bingoRoomInfo.inviteCode!}
      isOpen={isPopupOpen}onClose={handlePopupClose}
    />

    <SafeAreaView style={styles.BingoBoardScreenWrap}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.BingoBoardScreen}>
        <Header onPress={handleMenuPress} />

        <View style={styles.introMessageBox}>
          <Text style={styles.introMessage}>
            Hi {userName},
          </Text>
          <Text style={styles.introMessage}>
            Lets start!
          </Text>
        </View>
        
        {!isStarted && (
          <MessegeBox
            color={isAllBingoFilled ? MessageBoxColor.pink : MessageBoxColor.yellow}
            title={isAllBingoFilled ? 'Save' : 'Fill up your bingo.'}
            message={isAllBingoFilled ? `Click 'Save', if you fill up all bingo boxes` : `You can start the game by completing ${unfilledBingoNumber} ${unfilledBingoNumber > 1 ? 'boxes' : 'box' }`}
            onPress={handleStartButtonPress}
          />
        )}

        <View style={styles.bingoContainer}>
          {bingoItems.map(({ type, color, value, id, done }, index) => (
            <BingoBox
              type={type}
              checked={done}
              {...(id !== null ? {onPress: handleBingoItemPress(id)} : {})}
              key={index}
            >
              {(id) ? (
                <Text>{value}</Text>
              ): (
                <TextInput
                  value={value}
                  placeholder="plz input your habit" 
                  multiline 
                  onChangeText={handleTextChange(index)}
                  onEndEditing={handleOnEndEditing(index)}
                />
              )}
            </BingoBox>
          ))}
        </View>

        <DashedButton
          title="+ add your friend" 
          color={theme.color.white}
          onPress={handleFriendAddButtonPress}
        />
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    </>
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
    marginBottom: 16,
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
