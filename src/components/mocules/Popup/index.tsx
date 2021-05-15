import React from 'react'
import styled from 'styled-components/native'
import CloseIcon from '@/assets/icons/close.svg'

export interface Props {
  open: boolean
  title: string
  onClose: () => void
}

const Popup: React.FC<Props> = ({ open, title, onClose, children }) => {
  return (
    <>
      {open && (
        <StyledBackgroundContainer>
          <StyledPopup>
            <StyledHeader>
              <StyledTitle>
                {title}
              </StyledTitle>
              <StyledCloseButton onPress={onClose}>
                <CloseIcon />
              </StyledCloseButton>
            </StyledHeader>
            <StyledContent>{children}</StyledContent>
          </StyledPopup>
        </StyledBackgroundContainer>
      )}
    </>
  )
}

const StyledBackgroundContainer = styled.SafeAreaView`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  flex: 1;
  background-color: rgba(51, 51, 51, 0.6);
`

const StyledPopup = styled.View`
  padding: 28px 24px;
  margin: 180px 16px;
  background-color: #dcdcdc;
  border-radius: 34px;
`

const StyledHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const StyledTitle = styled.Text`
  color: #333333;
  font-weight: 700;
  font-size: 24px;
`

const StyledContent = styled.View``

const StyledCloseButton = styled.Pressable`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  border-radius: 15px;
`

export default Popup
