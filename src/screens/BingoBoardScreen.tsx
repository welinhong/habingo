/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RouteProp } from '@react-navigation/core'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import {
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  Keyboard,
  TouchableWithoutFeedback,
  GestureResponderEvent
} from 'react-native'
import styled from 'styled-components/native'
import { UserContext } from '../../src/contexts/UserContext'
import { BingoStackList } from '../../src/types'
import { theme } from '../../src/styles/theme'
import BingoBox from '../../src/components/atoms/BingoBox'
import MessegeBox, { MessageBoxColor } from '../../src/components/atoms/MessegeBox'
import DashedButton from '../../src/components/mocules/DashedButton'
import { useBingoService } from '../hooks/useBingoService'
import InvitationPopup from '../../src/components/organisms/InvitationPopup'
import { useBingoRoomService } from '../../src/hooks/useBingoRoomService'
import Header from '../../src/components/mocules/Header'
import IntroMessageBox from '../../src/components/atoms/IntroMessageBox'
import Margin from '../../src/components/atoms/Margin'


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

  // ?????? ?????? ?????? - ????????? ?????????
  const handleFriendAddButtonPress = async () => {
    // ?????? ?????????
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

  // ?????? ????????? ????????????
  useEffect(() => {
    const getBingoDetail = async () => {
      // ?????? ????????? ??????
      const { latestBingoId, latestBingoBingoRoomId } = await bingoService.getList()

      if (latestBingoId) {
        setBingoInfo({
          id: latestBingoId,
          bingoRoomId: latestBingoBingoRoomId
        })

        // ?????????, ?????? ????????? ????????? ???????????? ????????????
        const bingo = await bingoService.getDetail(latestBingoId)

        // bingo.bingoItems seq ???????????? ????????????
        bingo.bingoItems.sort((a: any, b: any) => a.seq - b.seq)

        // ?????? ????????? ??????
        updateBingoItems(bingo?.bingoItems)
      } else {
        // ?????????, ????????? ????????? ????????????
        const { id, bingoRoomId } = await bingoService.addOne()
        setBingoInfo({
          id,
          bingoRoomId
        })
      }
    }

    getBingoDetail()
  }, [])

  // ?????? ???????????? ??? ????????? ????????? ??????
  useEffect(() => {
    const unfilledBingoNumbers = bingoItems.filter((bingo) => !bingo.value).length
    setUnFilledBingoNumber(unfilledBingoNumbers)
    
    const isFilled = unfilledBingoNumber === 0
    setIsAllBingoFilled(isFilled)
  }, [bingoItems])

  // ?????? ???????????? ?????? ?????????????????? ?????? - ?????? ?????? ????????? ????????????
  useEffect(() => {
    const start = bingoItems.every((item) => !!item.id)
    setIsStarted(start)
  }, [bingoItems])

  return (
    <>
    {/* TODO: api ???????????? invitation code ???????????? */}
    <InvitationPopup
      invitationCode={bingoRoomInfo.inviteCode!}
      isOpen={isPopupOpen}onClose={handlePopupClose}
    />

    <StyledBingoBoardScreen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledBingoBoardScreenInner>
        <Header onPress={handleMenuPress} />

        <Margin bottom={16}>
          <IntroMessageBox name={userName} />
        </Margin>
        
        {!isStarted && (
          <MessegeBox
            color={isAllBingoFilled ? MessageBoxColor.pink : MessageBoxColor.yellow}
            title={isAllBingoFilled ? 'Save' : 'Fill up your bingo.'}
            message={isAllBingoFilled ? `Click 'Save', if you fill up all bingo boxes` : `You can start the game by completing ${unfilledBingoNumber} ${unfilledBingoNumber > 1 ? 'boxes' : 'box' }`}
            onPress={handleStartButtonPress}
          />
        )}

        <StyledBingoContainer>
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
        </StyledBingoContainer>

        <DashedButton
          title="+ add your friend" 
          color={theme.color.white}
          onPress={handleFriendAddButtonPress}
        />
      </StyledBingoBoardScreenInner>
      </TouchableWithoutFeedback>
    </StyledBingoBoardScreen>
    </>
  )
}

const StyledBingoContainer = styled.View`
  display: flex;
  width: 345px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 16px;
`
const StyledBingoBoardScreen = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.color.background};
`
const StyledBingoBoardScreenInner = styled.View`
  padding: 15px;
`
export default BingoBoardScreen
