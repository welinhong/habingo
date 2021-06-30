import React from 'react'
import styled from 'styled-components/native'

export interface Props {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

const Margin: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledContainer {...props}>
      {props.children}
    </StyledContainer>
  )
}

const StyledContainer = styled.View<Props>`
  ${({ top }) => top && `margin-top: ${top}px;`}
  ${({ right }) => right && `margin-right: ${right}px;`}
  ${({ bottom }) => bottom && `margin-bottom: ${bottom}px;`}
  ${({ left }) => left && `margin-left: ${left}px;`}
`

export default Margin
