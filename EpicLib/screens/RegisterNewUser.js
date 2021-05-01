/* 
      * * *   R E G I S T E R    N E W    U S E R  * * *
    
      Screen to add a new user to the database
    
 */

import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, StyleSheet, SafeAreaView,Text, Button, TextInput} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {Picker} from '@react-native-picker/picker';
//Import from the library
import * as SQLite from 'expo-sqlite';
//variable used to open database
const db = SQLite.openDatabase('db.db');

//Main function
export default function RegisterNewUser({navigation}) {

   
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [role, setRole] = useState('');
  
    //function to validate email
    let validate = (text) => {
      console.log(text);
      //pattern to compare the input:
      // - at least one letter and also accepts '.' and/or '-'
      // - '@' once
      // - at least one letter after the '@' and '.' and/or '-'
      // - the '.' and two or more letters
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;        
      

      if (reg.test(text) === false) {   //test the email with the pattern above described (input by input)
        console.log("Email is Not Correct");               
        return false;
      }
      else {
        //valid email
        setEmail(text);
        console.log("Email is Correct");
      }
    }


    let register_NewUser = () => {
      console.log( email, password, role);
      //Validation of the input, in case there is nothing added, request it
      
      //if email is empty
      if (!email) {
        alert('Please fill a valid Email');
        return;
      }
      if (!password) {
        alert('Please fill Password');
        return;
      }
      if (!role) {
        alert('Please fill Role');
        return;
      }

      db.transaction(function (tx) {
        //execution of the query to insert the data
        tx.executeSql(
          'INSERT INTO users (email, password, role) VALUES (?,?,?)',
          [email, password, role],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            //validating there are information added
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
              //in case there is an error to add information, display it
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
                  placeholder="Enter your Email"
                  //to initializate the keyboard on lowercase
                  autoCapitalize="none"
                  keyboardType="email-address"           
                  //call the validate function
                  onChangeText={(email) => validate(email)}

                  maxLength={30}
                  style={{ padding: 10 }}
                />
                <Mytextinput
                  placeholder="Insert a Password"
                  onChangeText={
                    (password) => setPassword(password)
                  }
                  maxLength={225}
                  style={{ textAlignVertical: 'top', padding: 10 }}
                />
                {/* The picker component allows us to show a list of items that the user can select, in this case: a user role */}
                <View style={styles.viewPick}>
                  <Picker
                    selectedValue={role}
                    onValueChange={(itemValue, itemIndex) =>
                      setRole(itemValue)
                    } style={{ padding: 10, color: '#007FFF', borderColor: 'white'}}>
                    <Picker.Item label="Select a Role" value="" />
                    <Picker.Item label="User" value="user" />
                    <Picker.Item label="Admin" value="admin" />
                  </Picker>
                </View>

                <Mybutton title="Submit" customClick={register_NewUser} />
            
              </KeyboardAvoidingView>
            </ScrollView>
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
  //definition of styles
  const styles = StyleSheet.create({
    viewPick: {
      marginLeft: 35,
      marginRight: 35,
      marginTop: 10,
      borderColor: '#007FFF',
      borderWidth: 1,
    }
  });