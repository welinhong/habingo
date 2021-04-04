/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BingoPanelScreen = ({route, navigation}) => {
  const {items = []} = route.params || {};

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

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
  );
};

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
});

export default BingoPanelScreen;
