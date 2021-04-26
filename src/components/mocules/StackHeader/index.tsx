import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ArrowBackIcon from '../../../../assets/icons/arrow-back.svg'
import { theme } from '../../../styles/theme'

export interface Props {
  title: string,
  onPress: () => void
}

const Header: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.stackHeader}>
      <Pressable style={styles.backButton} onPress={onPress}>
        <ArrowBackIcon width={24} height={24} />
        <Text style={styles.backButtonTitle}>{title}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  stackHeader: {
    padding: 10,
  },
  backButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButtonTitle: {
    ...theme.typography.h1,
    marginLeft: 5,
  }
})

export default Header
