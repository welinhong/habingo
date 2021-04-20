import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import React, { useState } from 'react'
import { StyleSheet, View, Text, Button, TextInput, SafeAreaView } from 'react-native'
import theme from '../styles/theme'
import { TabParamList } from '../types'

interface Props {
  navigation: BottomTabNavigationProp<TabParamList, 'BingoNewItemsPanel'>
}

const BingoNewItemsScreen: React.FC<Props> = ({ navigation }) => {
  const [value, onChangeText] = useState<string>('')
  const [items, onChangeItems] = useState<string[]>([])

  const handleAddButtonClick = () => {
    const newItems = [...items, value]
    onChangeItems(newItems)

    onChangeText('')
  }

  const handleDeleteButtonClick = (index: number) => {
    const newItems = items.filter((item, itemIndex) => itemIndex !== index)
    onChangeItems(newItems)
  }

  const handleNavigation = () => {
    navigation.navigate({
      name: 'BingoPanel',
      params: {
        items,
      },
    })
  }

  return (
    <SafeAreaView style={styles.NewItemsScreenWrap}>
      <View style={styles.NewItemsScreen}>
        <Text style={styles.title}>New</Text>
        <View style={styles.textInputWrap}>
          <TextInput
            onChangeText={(text) => onChangeText(text)}
            value={value}
            placeholder="Add your item"
            style={styles.textInput}
          />
          <Button
            title="Add"
            disabled={items.length > 9 || value.length === 0}
            onPress={handleAddButtonClick}
          />
        </View>

        <View style={styles.itemList}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemBox}>
              <Text>{item}</Text>
              <Button title="X" onPress={() => handleDeleteButtonClick(index)} />
            </View>
          ))}
        </View>

        <Button
          title="Save"
          onPress={handleNavigation}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  NewItemsScreenWrap: {
    flex: 1,
    backgroundColor: theme.color.lightyellow
  },
  NewItemsScreen: {
    padding: 15,
  },
  title: {
    textAlign: 'left',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInputWrap: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    width: '100%',

  },
  textInput: {
    flex: 1,
    padding: 15,
    backgroundColor: '#ffffff'
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemList: {
    padding: 10,
  },
})

export default BingoNewItemsScreen
