import React, { useState } from 'react'
import styled, { css } from 'styled-components/native'
import Clipboard from '@react-native-community/clipboard'
import Button, { ButtonColor } from '../../../../src/components/atoms/Button'
import Popup from '../../../../src/components/mocules/Popup'
import TextField from '../../../../src/components/mocules/TextField'

export interface Props {
  isOpen: boolean
  invitationCode: string
  onClose: () => void
}

const InvitationPopup: React.FC<Props> = ({ isOpen, invitationCode, onClose }) => {
  const [friendCode, setFriendCode] = useState('')

  const handleCopyPress = () => {
    Clipboard.setString(invitationCode);
  }
  
  const handleEnterPress = () => {}

  return (
    <Popup title="Add your friend" open={isOpen} onClose={onClose}>
      <TextField
        value={friendCode}
        placeholder="Enter friend's code"
        isButton={true}
        buttonTitle="Enter"
        buttonColor={friendCode ? ButtonColor.deepyellow : ButtonColor.lightgray}
        onChange={setFriendCode}
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
  )
}

const StyledContainer = styled.View<Props>``
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

export default InvitationPopup
