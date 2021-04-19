/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/core'
import React, { ComponentType } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TabParamList } from '../types'

interface Props {
  route: RouteProp<TabParamList, 'BingoPanel'>
  navigation: BottomTabNavigationProp<TabParamList, 'BingoPanel'>
}

const BingoPanelScreen: React.FC<Props> = ({ route, navigation }) => {
  const { items = [] } = route.params

  const handleMenuPress = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // navigation.openDrawer()
  }

  return (
    <SafeAreaView style={styles.bingoPanel}>
      <View>
        <Text style={styles.title}>HaBingo</Text>
        <Button title="menu" onPress={handleMenuPress} />
      </View>

      <View style={styles.bingoContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <View style={styles.bingoBlock} key={index}>
            {items[index] && <Text>{items[index]}</Text>}
            {!items[index] && (
              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => navigation.navigate('BingoNewItemsPanel')}>
                <Text style={styles.inputButtonText}>plz input your habit</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    // padding: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  bingoPanel: {
    flex: 1,
    alignItems: 'center',
  },
  bingoContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
  },
  bingoBlock: {
    width: '33.3%',
    height: '33.3%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  inputButton: {},
  inputButtonText: {
    color: '#666666',
  },
})

export default BingoPanelScreen
