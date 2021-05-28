import React from 'react'
import styled, { css } from 'styled-components/native'
import { theme } from '../../../styles/theme'

export enum ButtonColor {
  lightyellow = 'lightyellow',
  yellow = 'yellow',
  blue = 'blue',
  pink = 'pink',
  deepyellow = 'deepyellow',
  gray = 'gray',
  lightgray = 'lightgray'
}

export enum ButtonSize {
  small = 'small',
  medium = 'medium'
}

export interface Props {
  title: string
  color?: ButtonColor
  size?: ButtonSize
  onPress: () => void
}

const Button: React.FC<Props> = ({ title, color, size = ButtonSize.small, onPress }) => {
  return (
    <StyledContainer color={color} size={size} onPress={onPress}>
      <StyledText>{ title }</StyledText>
    </StyledContainer>
  )
}

interface ContainerProps {
  color?: ButtonColor
  size?: ButtonSize
}

const StyledContainer = styled.TouchableOpacity<ContainerProps>`
  padding: 10px 18px;
  background-color: ${({ color }) => theme.color[color || ButtonColor.blue]};
  border-radius: 24px;
  align-self: flex-start;
  border: 1px solid ${({color}) => color === ButtonColor.gray ? theme.color.white : theme.color[color || ButtonColor.blue]};

  ${({ color }) => css`
    background-color: ${theme.color[color || ButtonColor.blue]};
    border: 1px solid ${color === ButtonColor.gray ? theme.color.white : theme.color[color || ButtonColor.blue]};
  `}

  padding: ${({ size }) => {
    switch(size) {
      case ButtonSize.medium:
        return '16px 40px'
      case ButtonSize.small:
      default:
        return '10px 18px'
    }
  }};
`

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.color.white};
`

export default Button
