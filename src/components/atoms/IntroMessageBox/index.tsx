import React from 'react'
import styled from 'styled-components/native'
import { theme } from '../../../../src/styles/theme'

export interface Props {
  name: string
}

const IntroMessageBox: React.FC<Props> = ({ name }) => {
  return (
    <StyledContainer>
      <Message>
        Hi {name},
      </Message>
      <Message>
        Let&apos;s start!
      </Message>
    </StyledContainer>
  )
}

const StyledContainer = styled.View``
const Message = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.color.mainFont}
`

export default IntroMessageBox
