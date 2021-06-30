import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled, { css } from 'styled-components/native'
import MenuIcon from '../../../../assets/icons/menu.svg'
import { theme } from '../../../../src/styles/theme'

export interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined
}

const Header: React.FC<Props> = ({ onPress }) => {
  return (
    <StyledContainer>
      <Title>Habingo</Title>
      <MenuButton onPress={onPress}>
        <MenuIcon />
      </MenuButton>
    </StyledContainer>
  )
}

const StyledContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20;
`
const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${theme.color.mainFont};
`
const MenuButton = styled.Pressable`
  position: absolute;
  right: 0;
`

export default Header
