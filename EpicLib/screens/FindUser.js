import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default function findUser({navigation}){
    let [inputUserId, setInputUserId] = useState('');
    let [userData, setUserData] = useState({});
  
    let searchUser = () => {
      console.log(inputUserId);
      setUserData({});
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users where id_user = ?',
          [inputUserId],
          (tx, results) => {
            var len = results.rows.length;
            console.log('len', len);
            if (len > 0) {
              setUserData(results.rows.item(0));
            } else {
              alert('No user found');
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
              placeholder="Enter User Id"
              onChangeText={(inputUserId) => setInputUserId(inputUserId)}
              style={{ padding: 10 }}
            />
            <Mybutton title="Search User" customClick={searchUser} />
            <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
              <Text>User Id: {userData.id_user}</Text>
              <Text>User Email: {userData.email}</Text>
              <Text>User PW: {userData.password}</Text>
              <Text>User Role: {userData.role}</Text>
            </View>
          </View>
        
          
        </View>
      </SafeAreaView>
    );



}