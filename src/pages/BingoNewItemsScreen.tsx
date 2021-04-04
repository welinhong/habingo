import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
} from 'react-native';

const BingoNewItemsScreen = ({route, navigation}) => {
  const [value, onChangeText] = useState<string>('');
  const [items, onChangeItems] = useState<string[]>([]);

  const handleAddButtonClick = () => {
    const newItems = [...items, value];
    onChangeItems(newItems);

    onChangeText('');
  };

  const handleDeleteButtonClick = (index: number) => {
    const newItems = items.filter((item, itemIndex) => itemIndex !== index);
    onChangeItems(newItems);
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Add Your Habit</Text>
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
        onPress={() => {
          navigation.navigate({
            name: 'BingoPanel',
            params: {
              items,
            },
          });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 40,
    padding: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  textInputWrap: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: 'yellow',
    width: '100%',
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemList: {
    padding: 10,
  },
});

export default BingoNewItemsScreen;
