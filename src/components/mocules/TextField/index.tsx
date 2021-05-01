import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { theme } from '../../../styles/theme'

export interface Props {
  value: string
  placeholder?: string
  onChange?: (text: string) => void
}

const TextField: React.FC<Props> = ({ value, placeholder, onChange }) => {
  return (
    <>
      <TextInput value={value} style={styles.textField} placeholder={placeholder} onChangeText={onChange} />
    </>
  )
}

const styles = StyleSheet.create({
  textField: {
    backgroundColor: theme.color.white,
    padding: 20,
    borderRadius: 100,
    fontSize: 16,
  }
})

export default TextField
