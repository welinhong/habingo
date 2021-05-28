import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import styled from 'styled-components/native'
import { RootStackParamList } from '../types'
import TextField from '../../src/components/mocules/TextField'
import Button, { ButtonColor, ButtonSize } from '../../src/components/atoms/Button'
import { theme } from '../../src/styles/theme'
import Space from '../../src/components/atoms/Space'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')

  const handleIdInput = (text: string) => {
    setLoginId(text)
  }

  const handlePasswordInput = (text: string) => {
    setPassword(text)
  }

  // TODO: Login api call
  const handleButtonPress = () => {
    console.warn('Login');
    // api call

    // previous screen
    navigation.goBack()
  }

  return (
    <StyledLoginScreen>
      <StyledContainerr>
        <StyledTitle>
          Sign In
        </StyledTitle>
        <Space bottom={30} />
        <TextField
          value={loginId}
          placeholder="Id"
          onChange={handleIdInput}
        />
        <Space bottom={10} />
        <TextField
          value={password}
          placeholder="Password"
          onChange={handlePasswordInput}
        />
        <Space bottom={30} />
        
        <StyledButtonWrap>
          <Button
            title="Login"
            color={ButtonColor.gray}
            size={ButtonSize.medium}
            onPress={handleButtonPress}
          />
        </StyledButtonWrap>
        <Space bottom={70} />
      </StyledContainerr>
    </StyledLoginScreen>
  )
}


const StyledTitle = styled.Text`
  color: ${theme.color.mainFont};
  font-size: 30px;
  font-weight: 500;
`

const StyledLoginScreen = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: ${theme.color.background};
`

const StyledContainerr = styled.View`
  align-items: center;
  padding: 20px;
`

const StyledButtonWrap = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export default LoginScreen
