import React, { useContext, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import styled from 'styled-components/native'
import { RootStackParamList } from '../types'
import TextField from '../../src/components/mocules/TextField'
import Button, { ButtonColor, ButtonSize } from '../../src/components/atoms/Button'
import { theme } from '../../src/styles/theme'
import Space from '../../src/components/atoms/Space'
import { AuthContext } from '../../src/contexts/AuthContext'

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')

  const auth = useContext(AuthContext)
  
  const handleButtonPress = async () => {
    await auth.login(loginId, password)
  }
  
  return (
    <StyledLoginScreen>
      <StyledContainer>
        <StyledTitle>
          Sign In
        </StyledTitle>
        <Space bottom={30} />
        <TextField
          value={loginId}
          placeholder="Id"
          onChange={setLoginId}
        />
        <Space bottom={10} />
        <TextField
          value={password}
          placeholder="Password"
          onChange={setPassword}
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
      </StyledContainer>
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

const StyledContainer = styled.View`
  align-items: center;
  padding: 20px;
`

const StyledButtonWrap = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export default LoginScreen
