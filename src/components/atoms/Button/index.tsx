import { theme } from '../../../styles/theme'
import React from 'react'
import styled from 'styled-components/native'

export interface Props {
  title: string
  color?: ButtonColor
  onPress: () => void
}

export enum ButtonColor {
  lightyellow = 'lightyellow',
  yellow = 'yellow',
  blue = 'blue',
  pink = 'pink',
  deepyellow = 'deepyellow',
  gray = 'gray'
}

const Button: React.FC<Props> = ({ title, color, onPress }) => {
  return (
    <StyledContainer color={color} onPress={onPress}>
      <StyledText>{ title }</StyledText>
    </StyledContainer>
  )
}

interface ContainerProps {
  color?: ButtonColor
}

const StyledContainer = styled.TouchableOpacity<ContainerProps>`
  padding: 10px 18px;
  background-color: ${({ color }) => theme.color[color || ButtonColor.blue]};
  border-radius: 24px;
  align-self: flex-start;
`

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.color.white};
`

export default Button
