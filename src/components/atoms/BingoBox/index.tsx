import { ThemeProvider } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { StyledProps } from 'styled-components'
import styled, { css } from 'styled-components/native'
import {theme} from '../../../styles/theme'

export interface Props {
  type: string
  highlight?: boolean
}

const BingoBox: React.FC<Props> = ({ type, highlight = false, children }) => {
  return (
    <Container type={type} highlight={highlight}>
      { children }
    </Container>
  )
}


const borderRadius = '60px'
const Container = styled.View<Props>`
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
