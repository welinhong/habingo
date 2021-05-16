import React from 'react'
import styled, { css } from 'styled-components/native'
import Button, { ButtonColor } from '../../atoms/Button'
import { theme } from '../../../styles/theme'

export interface Props {
  value: string
  placeholder?: string
  isButton?: boolean
  buttonTitle?: string
  buttonColor?: ButtonColor
  onChange?: (text: string) => void
  onPress?: () => void
}

const TextField: React.FC<Props> = ({ value, placeholder, isButton = false, buttonTitle, buttonColor, onPress, onChange }) => {
  return (
    <StyledContainer isButton={isButton}>
      <StyledInput value={value} placeholder={placeholder} onChangeText={onChange} />
      {isButton && buttonTitle && onPress && (
        <Button title={buttonTitle} color={buttonColor} onPress={onPress} />
      )}
    </StyledContainer>
  )
}

interface ContainerProps {
  isButton: boolean
}

const StyledContainer = styled.View<ContainerProps>`
  display: flex;
  flex-direction: row;
  padding: ${({ isButton }) => isButton ? '9px 9px 9px 20px' : '20px'};
  border-radius: 100px;
  background-color: ${theme.color.white};
`

const StyledInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`

export default TextField
