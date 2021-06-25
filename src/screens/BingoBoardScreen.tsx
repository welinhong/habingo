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
import TextField from '../../src/components/mocules/TextField'
import MenuIcon from '../../assets/icons/menu.svg'
import Popup from '../../src/components/mocules/Popup'
import Button, { ButtonColor } from '../../src/components/atoms/Button'
import styled from 'styled-components/native'
import Clipboard from '@react-native-community/clipboard'
import { useBingoService } from '../hooks/useBingoService'

interface Props {
  route: RouteProp<BingoStackList, 'BingoBoard'>
  navigation: DrawerNavigationProp<BingoStackList, 'BingoBoard'>
}

const BingoBoardScreen: React.FC<Props> = ({ route, navigation }) => {
  const user = useContext(UserContext)
  const bingoService = useBingoService()
  
  const [isAllBingoFilled, setIsAllBingoFilled] = useState(false)
  const [unfilledBingoNumber, setUnFilledBingoNumber] = useState(0)

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [friendCode, setFriendCode] = useState('')
  const [invitationCode, setInvitationCode] = useState('welinInivation') // TODO: API 확인 후 default value 수정하기
  const [bingoId, setBingoId] = useState(0)

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
  const handleDashedButtonPress = () => {
    setIsPopupOpen(true)
  }

  // 팝업 닫기
  const handleClose = () => {
    setIsPopupOpen(false)
  }

  const handleFriendCodeChange = (text: string) => {
    setFriendCode(text)
  }

  const handleCopyPress = () => {
    Clipboard.setString(invitationCode);
  }
  
  const handleEnterPress = () => {}

  // Done item or Clear Done item
  const handleBingoItemPress = (id: number) => async (event: GestureResponderEvent) => {
    // check if item is done
    const selectedItem = bingoItems.find((item) => item.id === id)
    if (selectedItem?.done) {
      await bingoService.cancelItemDone(bingoId, id)
    } else {
      await bingoService.doneItem(bingoId, id)
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
    await bingoService.addItem(bingoId, value)
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

  // 빙고 데이터 불러오기
  useEffect(() => {
    const getBingoDetail = async () => {
      // 빙고 리스트 호출
      const { latestBingoId } = await bingoService.getList()

      if (latestBingoId) {
        setBingoId(latestBingoId)

        // 있다면, 가장 최근의 빙고를 가져와서 보여준다
        const bingo = await bingoService.getDetail(latestBingoId)

        // bingo.bingoItems seq 순서대로 정렬하기
        bingo.bingoItems.sort((a: any, b: any) => a.seq - b.seq)

        // 빙고 데이터 셋팅
        updateBingoItems(bingo?.bingoItems)
      } else {
        // 없다면, 새로운 빙고를 생성한다
        const { id } = await bingoService.addOne()
        setBingoId(id)
      }
    }

    getBingoDetail()
  }, [])

  // 모든 빙고값이 다 채워져 있는지 확인
  useEffect(() => {
    const isFilled = bingoItems.every((bingo) => bingo.value)
    setIsAllBingoFilled(isFilled)

    const unfilledBingoNumbers = bingoItems.filter((bingo) => !bingo.value).length
    setUnFilledBingoNumber(unfilledBingoNumbers)
  }, [bingoItems])

  return (
    <>
    <Popup title="Add your friend" open={isPopupOpen} onClose={handleClose}>
      <TextField
        value={friendCode}
        placeholder="Enter friend's code"
        onChange={handleFriendCodeChange}
        isButton={true}
        buttonTitle="Enter"
        buttonColor={friendCode ? ButtonColor.deepyellow : ButtonColor.lightgray}
        onPress={handleEnterPress}
      />
      <StyledDivider>
        <StyledOrText>or</StyledOrText>
      </StyledDivider>

      <StyledCodeContentWrapper>
        <StyledCodeContent>
          <StyledTitleText>Code: {invitationCode}</StyledTitleText>
          <StyledDesciptionText>
            코드를 복사해 함께 할 친구에게 공유해주세요.
          </StyledDesciptionText>
        </StyledCodeContent>
        <Button title="Copy" color={ButtonColor.blue} onPress={handleCopyPress}></Button>
      </StyledCodeContentWrapper>
    </Popup>

    <SafeAreaView style={styles.BingoBoardScreenWrap}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          color={isAllBingoFilled ? MessageBoxColor.pink : MessageBoxColor.yellow}
          title={isAllBingoFilled ? 'Now, ready to start!' : 'Fill up your bingo.'}
          message={isAllBingoFilled ? 'If you want to start, click this box 👆': `You can start the game by completing ${unfilledBingoNumber} ${unfilledBingoNumber > 1 ? 'boxes' : 'box' }`}
          onPress={handleStartButtonPress}
        />

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
          onPress={handleDashedButtonPress}
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

const StyledDivider = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`

const StyledOrText = styled.Text``

const StyledCodeContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
`
const StyledCodeContent = styled.View`
  flex: 1;
`
const StyledTitleText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`
const StyledDesciptionText = styled.Text`
  font-size: 14px;
  font-weight: 400;
`

export default BingoBoardScreen
