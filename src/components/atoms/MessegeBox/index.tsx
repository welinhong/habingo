import React from 'react'
import styled from 'styled-components/native'
import { theme } from '../../../styles/theme'

export enum MessageBoxColor {
  yellow = 'yellow',
  pink = 'pink',
}

export interface Props {
  title?: string
  messege?: string
  color?: MessageBoxColor
  onPress?: () => void
}

const MessageBox: React.FC<Props> = ({ title, messege, color = MessageBoxColor.yellow, onPress }) => {
  const handleOnPress = () => {
    onPress && onPress()
  }
  
  return (
    <StyledContainer color={color} onPress={handleOnPress}>
      {title && <StyledTitle>{title}</StyledTitle>}
      {messege && <StyledMesseage>{messege}</StyledMesseage>}
    </StyledContainer>
  )
}

const StyledContainer = styled.Pressable<Props>`
  background-color: ${({color}) => color && theme.color[color]};
  border-radius: 8px;
  padding: 14px 15px;
  margin-bottom: 16px;
`

const StyledTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`

const StyledMesseage = styled.Text`
  font-size: 14px;
  font-weight: 400;
`

export default MessageBox
