import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView,Text, Button, TextInput} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
//import the library to use sqlite
import * as SQLite from 'expo-sqlite';
//open the database
const db = SQLite.openDatabase('db.db');

//main function with navigation in the curly brackes to redirect to Home page.
export default function RegisterBook({navigation}) {
  // create for variables and we use useState to render the page
    let [book_id, setBook_id] = useState('');
    let [book_name, setBook_name] = useState('');
    let [author, setAuthor] = useState('');
    let [cathegory, setCathegory] = useState('');
  
    let register_book = () => {
      console.log(book_id, book_name, author, cathegory);
   //check there is something to fill the imputs.
    /*   if (!book_id) {
        alert('Please fill book id');
        return;
      } */
      if (!book_name) {
        alert('Please fill Book Name');
        return;
      }
      if (!author) {
        alert('Please fill Author');
        return;
      }
      if (!cathegory) {
        alert('Please fill Cathegory');
        return;
      }
 
      //insert the values in the data base.
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_books (book_name, author, cathegory) VALUES (?,?,?)',
          [book_name, author, cathegory],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert(
                //gives an alert if the user is registered successful
                'Success',
                'Your book is Registered Successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Home'),
                  },
                ],
                { cancelable: false }
              );
              //gives an alert if there is something wrong with the register process
            } else alert('Registration Failed');
          }
        );
      });
    };
  
    //we receive the values here passed with the props inside of MyTextInput and set the values
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                  
              {/*   <Mytextinput
                  placeholder="Enter id of the book"
                  onChangeText={
                    (book_id) => setBook_id(book_id)
                  }
                  style={{ padding: 10 }}
                />  */}
                <Mytextinput
                  placeholder="Enter the name of the book"
                  onChangeText={
                    (book_name) => setBook_name(book_name)
                  }
                  maxLength={30}
                  style={{ padding: 10 }}
                />
                <Mytextinput
                  placeholder="Enter Author"
                  onChangeText={
                    (author) => setAuthor(author)
                  }
                  maxLength={225}
                  numberOfLines={30}
                  style={{ textAlignVertical: 'top', padding: 10 }}
                />
                <Mytextinput
                  placeholder="Enter Cathegory of the book"
                  onChangeText={
                    (cathegory) => setCathegory(cathegory)
                  }
                  style={{ padding: 10 }}
                />

                <Mybutton title="Submit" customClick={register_book} />
            
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
