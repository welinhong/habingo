import React from 'react'
import styled from 'styled-components/native'
import { theme } from '../../../styles/theme'

export interface Props {
  title?: string
  messege?: string
  onPress?: () => void
}

const MessegeBox: React.FC<Props> = ({ title, messege, onPress }) => {
  const handleOnPress = () => {
    onPress && onPress()
  }
  return (
    <StyledContainer onPress={handleOnPress}>
      {title && <StyledTitle>{title}</StyledTitle>}
      {messege && <StyledMesseage>{messege}</StyledMesseage>}
    </StyledContainer>
  )
}

const StyledContainer = styled.Pressable<Props>`
  background-color: ${theme.color.yellow};
  border-radius: 8px;
  padding: 14px 15px;
  margin-bottom: 16px;
`

const StyledTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`

const StyledMesseage = styled.Text`
  font-size: 14px;
  font-weight: 400;
`

export default MessegeBox
