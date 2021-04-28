/**
 * Screen to add a new user to the database
 * Import of the components
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
      // - at least one letter and '.' and/or '-'
      // - '@' once
      // - at least one letter after the '@' and '.' and/or '-'
      // - the '.' and two or more letters
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;        
      //let reg= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;

      if (reg.test(text) === false) {   //test the email with the pattern above described (letter by letter)
        console.log("Email is Not Correct");    
        //alert ('Email not valid');
        // empty the email variable
        setEmail('');               
        return false;
      }
      else {
        //valid email
        setEmail(text);
        //alert ('Email valid')
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
      //definition of styles
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
                  //numberOfLines={30}
                  style={{ textAlignVertical: 'top', padding: 10 }}
                />
                
                <View style={styles.viewPick}>
                  <Picker
                    selectedValue={role}
                    onValueChange={(itemValue, itemIndex) =>
                      setRole(itemValue)
                    } style={{ padding: 10, color: '#007FFF', borderColor: 'white'}}>
                    <Picker.Item label="Select a Role" value=" " />
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
  const styles = StyleSheet.create({
    viewPick: {
      marginLeft: 35,
      marginRight: 35,
      marginTop: 10,
      borderColor: '#007FFF',
      borderWidth: 1,
    }
  });