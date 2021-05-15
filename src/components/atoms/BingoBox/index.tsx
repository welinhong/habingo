import React from 'react'
import styled, { css } from 'styled-components/native'
import {theme} from '../../../styles/theme'

export interface Props {
  type: string
  highlight?: boolean
  onPress?: () => void
  onLongPress?: () => void
}

const BingoBox: React.FC<Props> = ({ type, highlight = false, onPress, onLongPress, children }) => {
  return (
    <StyledPressableContainer type={type} highlight={highlight} onPress={onPress} onLongPress={onLongPress}>
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

  ${(props) => props.highlight && css`
    border: 2px solid ${theme.color.deepyellow};
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
