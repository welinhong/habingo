import { ThemeProvider } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { StyledProps } from 'styled-components'
import styled, { css } from 'styled-components/native'
import theme from '../../../styles/theme'

export interface Props {
  type: string
}

const BingoBox: React.FC<Props> = ({ type, children }) => {
  return (
    <Container type={type}>
      { children }
    </Container>
  )
}


const borderRadius = '60px'
const Container = styled.View<Props>`
  display: flex;
  justify-content: center;
  width: 110px;
  height: 110px;
  padding: 10px;
  border: 1px solid #000000;

  ${(props: StyledProps) =>  {
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
