/* 
      * * *   D E L E T E   B O O K   * * *

    Use of the function DeleteBook to remove a book from de Database
    
 */

import React, { useState } from 'react';
import { Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite';
//making connection with the sqlite db file which is inside a SQLite folder.
const db = SQLite.openDatabase('db.db');
 
export default function DeleteBook ({ navigation }) {
  let [inputBookId, setInputBookId] = useState('');

  let deleteBook = () => { //declares variables that can no be acccessed from outside the block
    db.transaction((tx) => {
      tx.executeSql( // deletes table using transaction executeSql
        'DELETE FROM  table_books where book_id=?',
        [inputBookId],
        (tx, results) => { 
          console.log('Results', results.rowsAffected);
          // this will be true  if rowsAffected was > 0 since it is a insert statement.
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
          } else { // if rowsAffected was < 0 returns an alert.
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