import React from 'react'
import styled, { css } from 'styled-components/native'

export interface Props {}

const Divider: React.FC<Props> = () => {
  return <StyledContainer></StyledContainer>
}

const StyledContainer = styled.View<Props>`
  height: 1px;
  background-color: #C6C6C8;
`

export default Divider
