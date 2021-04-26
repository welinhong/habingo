import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { theme } from '../../../styles/theme'

export interface Props {
  value: string
  onChange?: (text: string) => void
}

const TextField: React.FC<Props> = ({ value, onChange }) => {
  return (
    <>
      <TextInput value={value} style={styles.textField} onChangeText={onChange} />
    </>
  )
}

const styles = StyleSheet.create({
  textField: {
    backgroundColor: theme.color.white,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
  }
})

export default TextField
