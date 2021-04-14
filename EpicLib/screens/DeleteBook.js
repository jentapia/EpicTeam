import React, { useState } from 'react';
import { Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');
 
export default function DeleteBook ({ navigation }) {
  let [inputBookId, setInputBookId] = useState('');

  let deleteBook = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_books where book_id=?',
        [inputBookId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert(
              'Success',
              'Book deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid Book Id');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Book Id"
            onChangeText={
              (inputBookId) => setInputBookId(inputBookId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete Book" customClick={deleteBook} />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          EpicTeam 
        </Text>
      </View>
    </SafeAreaView>
  );
};