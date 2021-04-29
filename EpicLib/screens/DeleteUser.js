import React, { useState } from 'react';
import { Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite'; //expo-sqlite library that provides access to an SQLite DB

const db = SQLite.openDatabase('db.db'); //Open a database, creating it if it doesn't exist, and return a Database object.

/**
 * the DeleteUser function shows a text input where the user enters the id_user 
 * that wants to delete. 
 * Also, it is conditioned that the user to delete is not the user test.
 */
 
export default function DeleteUser ({ navigation }) {
  let [inputUserId, setInputUserId] = useState('');

  let deleteuser = () => {
    if (inputUserId != 1){  // this coonditional makes sure that the user to be deleted is not the default user "test"
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  users where id_user=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid User Id');
          }
        }
      );
    });
  } else {  // the method will return an alert if the "test" user is gonna be deleted
    alert('Test User cannot be deleted')
  }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter User Id"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete User" customClick={deleteuser} />
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