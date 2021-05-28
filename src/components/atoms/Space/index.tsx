import React from 'react'
import styled from 'styled-components/native'

export interface Props {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

const Space: React.FC<Props> = ({ top, right, bottom, left }) => {
  return (
    <StyledSpace
      top={top}
      right={right}
      bottom={bottom}
      left={left}
    />
  )
}

const StyledSpace = styled.View<Props>`
  margin-top: ${({ top }) => top ? `${top}px` : 0};
  margin-right: ${({ right }) => right ? `${right}px` : 0};
  margin-bottom: ${({ bottom }) => bottom ? `${bottom}px` : 0};
  margin-left: ${({ left }) => left ? `${left}px` : 0};
`

export default Space
