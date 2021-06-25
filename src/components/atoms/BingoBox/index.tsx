import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled, { css } from 'styled-components/native'
import {theme} from '../../../styles/theme'

export interface Props {
  type: string // NOTE: shape이란 단어가 더 명확할 거 같다
  checked?: boolean
  onPress?: (event: GestureResponderEvent) => void
  onLongPress?: () => void
}

const BingoBox: React.FC<Props> = ({ type, checked = false, onPress, onLongPress, children }) => {
  return (
    <StyledPressableContainer type={type} checked={checked} onPress={onPress} onLongPress={onLongPress}>
      { children }
    </StyledPressableContainer>
  )
}

const borderRadius = '60px'
const StyledPressableContainer = styled.Pressable<Props>`
  display: flex;
  justify-content: center;
  width: 115px;
  height: 115px;
  padding: 10px;
  background-color: #ffffff;

  ${(props) => props.checked && css`
    background-color: ${theme.color.blue};
  `}

  ${(props) =>  {
    switch(props.type) {
      case 'a':
        return css`
          border-top-left-radius: ${borderRadius};
          border-bottom-right-radius: ${borderRadius};
        `
      case 'b':
        return css`
          border-top-left-radius: ${borderRadius};
          border-top-right-radius: ${borderRadius};
        `
      case 'c':
        return css`
          border-top-left-radius: ${borderRadius};
          border-bottom-left-radius: ${borderRadius};
        `
      case 'd':
        return css`
          border-top-right-radius: ${borderRadius};
          border-bottom-right-radius: ${borderRadius};
        `
      case 'e':
        return css`
          border-top-right-radius: ${borderRadius};
          border-bottom-left-radius: ${borderRadius};
        `
      case 'f':
        return css`
          border-bottom-left-radius: ${borderRadius};
          border-bottom-right-radius: ${borderRadius};
        `
    }
  }}
`

export default BingoBox
