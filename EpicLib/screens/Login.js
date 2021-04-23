import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import Mybutton from './components/Mybutton';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default function login({ navigation }) {
  const [users, setUsers] = React.useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  var userTest = {
    id: 1,
    email: 'test',
    passwd: '1234',
    role: 'admin'
  }
  var books = [{
    Book_id: 1,
    Book_name: "Papelucho",
    Author: "Marcela Paz",
    Cathegory: "Fantasy"
  },
  {
    Book_id: 2,
    Book_name: "Pride and Prejudice",
    Author: "Jane Austen",
    Cathegory: "Novel"
  },
  {
    Book_id: 3,
    Book_name: "La casa de los espiritus",
    Author: "Isabel Allende",
    Cathegory: "Novel"
  },
  {
    Book_id: 4,
    Book_name: "El Quijote de La Mancha",
    Author: "Miguel de Cervantes",
    Cathegory: "Novel"
  },
  {
    Book_id: 5,
    Book_name: "The lord of the rings",
    Author: "JRR Tolkien",
    Cathegory: "Fantasy"
  }];

  React.useEffect(() => {

      db.transaction(tx => {
    
        tx.executeSql('DROP TABLE IF EXISTS users', []); // The table users is dropped if exists in the DB 

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, email TEXT, passwd TEXT, role TEXT);",
          []
        );
        tx.executeSql(
         "insert into users (id_user, email, password, role) values (?, ?, ?, ?)",
         [userTest.id, userTest.email, userTest.passwd, userTest.role]
       );
         
      });
             
      db.transaction(tx => {
        tx.executeSql('DROP TABLE IF EXISTS table_books', []);
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS table_books (book_id INTEGER PRIMARY KEY NOT NULL, book_name TEXT, author TEXT, cathegory TEXT)",
          []
        );
        for (let i = 0; i < books.length; i++){
          tx.executeSql(
          "insert into table_books (book_id, book_name, author, cathegory) values (?, ?, ?, ?)",
          [books[i].Book_id, books[i].Book_name, books[i].Author, books[i].Cathegory]
        );}

     /*    tx.executeSql(
        "insert into table_books (book_id, book_name, author, cathegory) values (1, 'Papelucho', 'Marcela', ?)",
        [userTest.role]
      ); */

      });

  }, []);

  let validUser = () => {
    console.log(email, password);

    if (!email) {
      alert('Please fill Email');
      return;
    }
    if (!password) {
      alert('Please fill Password');
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM users where email = ? and password = ?',
          [email, password],
          (tx, results) => {
            var len = results.rows.length;
            console.log('len', len);
            if (len > 0) {

              return navigation.navigate('Home', {email: email, password: password});
              
            }  else {
              alert('Not valid User');
            }
          }
      );
    });
  };

 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo-epic.png')} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity onPress={() => navigation.navigate('dbUsers')}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterNewUser')}>
        <Text style={styles.forgot_button}>Don't you have an account? Click here?</Text>
      </TouchableOpacity>
 
      <Mybutton title= "LOGIN" customClick={validUser}/>

    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "lightskyblue",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "deepskyblue",
  },
});