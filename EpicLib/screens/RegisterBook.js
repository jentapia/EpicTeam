import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView,Text, Button, TextInput} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');


export default function RegisterBook({navigation}) {

    let [book_id, setBook_id] = useState('');
    let [book_name, setBook_name] = useState('');
    let [author, setAuthor] = useState('');
    let [cathegory, setCathegory] = useState('');
  
    let register_book = () => {
      console.log(book_id, book_name, author, cathegory);
  
      if (!book_id) {
        alert('Please fill book id');
        return;
      }
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

      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_books (book_id, book_name, author, cathegory) VALUES (?,?,?,?)',
          [book_id, book_name, author, cathegory],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert(
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
                  placeholder="Enter id of the book"
                  onChangeText={
                    (book_id) => setBook_id(book_id)
                  }
                  style={{ padding: 10 }}
                />
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
