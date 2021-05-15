import React from 'react'
import styled from 'styled-components/native'
import { theme } from '@/src/styles/theme'
import PersonIcon from '@/assets/icons/person.svg'

export interface Props {
  title: string
  color?: string
  beforeIcon?: string
  afterIcon?: string
  onPress: () => void
}

const DashedButton: React.FC<Props> = ({ title, color, onPress }) => {
  return (
    <StyledDashedButton title={title} color={color} onPress={onPress}>
      <StyledInner>
        <PersonIcon />
        <StyledText>{title}</StyledText>
      </StyledInner>
    </StyledDashedButton>
  )
}

const StyledDashedButton = styled.Pressable<Props>`
  font-weight: 700;
  font-size: 20px;
  border: 1px dashed ${theme.color.white};
  border-radius: 16px;
  padding: 23px;
`

const StyledInner = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledText = styled.Text`
  color: ${theme.color.white};
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
`

export default DashedButton
