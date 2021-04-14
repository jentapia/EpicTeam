import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView,Text, Button, TextInput} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');


export default function RegisterNewUser({navigation}) {

    let [id_user, setId_user] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [role, setRole] = useState('');
  
    let register_NewUser = () => {
      console.log(id_user, email, password, role);
  
      if (!id_user) {
        alert('Please fill Id');
        return;
      }
      if (!email) {
        alert('Please fill the Email');
        return;
      }
      if (!password) {
        alert('Please fill Password');
        return;
      }
      if (!role) {
        alert('Please fill Cathegory');
        return;
      }

      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO users (id_user, email, password, role) VALUES (?,?,?,?)',
          [id_user, email, password, role],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert(
                'Success',
                'Your are Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Registration Failed');
          }
        );
      });
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                <Mytextinput
                  placeholder="Enter your Id"
                  onChangeText={
                    (id_user) => setId_user(id_user)
                  }
                  style={{ padding: 10 }}
                />
                <Mytextinput
                  placeholder="Enter your Email"
                  onChangeText={
                    (email) => setEmail(email)
                  }
                  maxLength={30}
                  style={{ padding: 10 }}
                />
                <Mytextinput
                  placeholder="Insert a Password"
                  onChangeText={
                    (password) => setPassword(password)
                  }
                  maxLength={225}
                  numberOfLines={30}
                  style={{ textAlignVertical: 'top', padding: 10 }}
                />
                <Mytextinput
                  placeholder="Enter your Role"
                  onChangeText={
                    (role) => setRole(role)
                  }
                  style={{ padding: 10 }}
                />

                <Mybutton title="Submit" customClick={register_NewUser} />
            
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'grey'
            }}>
            EpicTeam
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: 'grey'
            }}>
          </Text>
        </View>
      </SafeAreaView>
    );
  };