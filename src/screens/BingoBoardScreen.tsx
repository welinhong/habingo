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
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native'
import { BingoStackList } from '../../src/types'
import { theme } from '../../src/styles/theme'
import BingoBox from '../../src/components/atoms/BingoBox'
import MessegeBox, { MessegeBoxColor } from '../../src/components/atoms/MessegeBox'
import DashedButton from '../../src/components/mocules/DashedButton'
import TextField from '../../src/components/mocules/TextField'
import MenuIcon from '../../assets/icons/menu.svg'
import Popup from '../../src/components/mocules/Popup'
import Button, { ButtonColor } from '../../src/components/atoms/Button'
import styled from 'styled-components/native'
import Clipboard from '@react-native-community/clipboard'

interface Props {
  route: RouteProp<BingoStackList, 'BingoBoard'>
  navigation: DrawerNavigationProp<BingoStackList, 'BingoBoard'>
}

const BingoBoardScreen: React.FC<Props> = ({ route, navigation }) => {
  const [start, setStart] = useState(false)
  const [selectedBingobox, setSelectedBingobox] = useState(null)
  const [isAllBingoFilled, setIsAllBingoFilled] = useState(false)
  const [unfilledBingoNumber, setUnFilledBingoNumber] = useState(0)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [friendCode, setFriendCode] = useState('')
  const [invitationCode, setInvitationCode] = useState('welinInivation') // TODO: API 확인 후 default value 수정하기

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

  // TODO: API 붙이기
  const handleOnEndEditing = (index: number) => (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    const value = e.nativeEvent.text
    // id가 있다면, 수정 api를 호출한다
    console.warn('빙고 아이템 수정', value)
    // id가 있다면, 새로운 value가 ''라면, 삭제 api를 호출한다.
    console.warn('빙고 아이템 삭제', value)
    
    // id가 없다면, 등록 api를 호출한다.
    // 해당 빙고 아이템에 id값을 추가한다
    console.warn('빙고 아이템 등록', value)
  }

  // 모든 빙고값이 다 채워져 있는지 확인
  useEffect(() => {
    const isFilled = bingos.every((bingo) => bingo.value)
    setIsAllBingoFilled(isFilled)

    const unfilledBingoNumbers = bingos.filter((bingo) => !bingo.value).length
    setUnFilledBingoNumber(unfilledBingoNumbers)
  }, [bingos])

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

        { !start && (
          <MessegeBox
            color={isAllBingoFilled ? MessegeBoxColor.pink : MessegeBoxColor.yellow}
            title={isAllBingoFilled ? 'Now, ready to start!' : 'Fill up your bingo.'}
            messege={isAllBingoFilled ? 'If you want to start, click this box 👆' : `You can start the game by completing ${unfilledBingoNumber} ${unfilledBingoNumber > 1 ? 'boxes' : 'box' }`}
            onPress={handleStartButtonPress}
          />
        )}
        {/* {isAllBingoFilled && <Button title={start ? "중지" : "시작하기"} onPress={handleStartButtonPress} />} */}

        <View style={styles.bingoContainer}>
          {bingos.map(({ type, color, value }, index) => (
            <BingoBox type={type} highlight={selectedBingobox === index} key={index}>
              { start && <Text>{value}</Text> }
              { !start && (
                <TextInput
                  value={value}
                  placeholder="plz input your habit" 
                  multiline 
                  onChangeText={handleTextChange(index)}
                  onEndEditing={handleOnEndEditing(index)}
                />
              ) }
            </BingoBox>
          ))}
        </View>

        <DashedButton
          title="+ add your friend" 
          color={theme.color.white}
          onPress={handleDashedButtonPress}
        />
      </View>
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
